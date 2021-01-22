const { connection } = require('../db/db');

const imgFileURL = 'http://dev.dxminds.online:6500/idea_section/image/';
const vdFileURL = 'http://dev.dxminds.online:6500/idea_section/video/';


exports.uploadIdea = (req, res, next) => {
  body_data =JSON.parse(req.body.data);
  console.log(body_data)
  var data = {
    category_id: body_data.category_id,
    sub_category_id: body_data.sub_category_id,
    article: body_data.article,
    created_by: body_data.created_by
  }
  console.log(data)
  connection.query("INSERT INTO idea_section set ?", data, function (err, result) {
    console.log(err);
    if (err) {
      res.json({statuscode:"401", status: "Failure", message: "Unable to insert details" });
    }
    else {
      var idea_section_id = result.insertId
      const files = req.files
   //console.log("idea_section_id",idea_section_id)
  // console.log("files",files)

      for (var i = 0; i < files.length; i++) {

        //  console.log(files.length);
        fieldname = req.files[i].fieldname
        filename = req.files[i].filename

      //  console.log(fieldname);
       // console.log(filename);


        if (files[i].mimetype == 'image/png' || files[i].mimetype == 'image/jpg' || files[i].mimetype == 'image/jpeg') {
          var imges_data = {
            idea_section_id: idea_section_id,
            image: filename,
            created_by: body_data.created_by
          }
          connection.query("INSERT INTO idea_section_image set ?", imges_data, function (err, result) {
            if (err) {
              res.json({statuscode:"401", status: "Failure", message: "Unable to insert images" });
            }

          });

        }
        //store videos
        if (files[i].mimetype == 'video/mp4') {
          var video_data = {
            idea_section_id: idea_section_id,
            video: filename,
            created_by: body_data.created_by
          }
          connection.query("INSERT INTO idea_section_video set ?", video_data, function (err, result) {
            if (err) {
              res.json({statuscode:"401", status: "Failure", message: "Unable to insert images" });
            }

          });

        }
      }
      res.json({
        statuscode:"200",
        status: "Success",
        message: "Successfully insert details",
        id: idea_section_id
      });
    }

  });

}//1

//delete Api

exports.ideadelete = (req, res,next) => {
  connection.query('delete from idea_section where idea_section_id = ?',[req.params.id],(err,result,field)=>{
    if(err){
      return console.log(err);
    }else{

      connection.query('delete from idea_section_image where idea_section_id = ?',[req.params.id],(err,result,field)=>{
        if(err){
          return console.log(err);
        }
      });
      connection.query('delete from idea_section_video where idea_section_id = ?',[req.params.id],(err,result,field)=>{
        if(err){
          return console.log(err);
        }
      });

    res.json({
      statuscode:200,
      status: "Success",
      message: "idea section Delete Successfully",
  });
}
  });
  


}

//Api for list of Idea 

exports.ideaSectionList = (req, res, next) => {
  var data = [];
  var images = [];
  var videos = [];
  connection.query('select * from idea_section where status=1', (err, result, field) => {
    if (err) {
      return console.log(err);
    } else {
      connection.query('select * from idea_section_image where idea_section_id = ?', [result.idea_section_id], (err, result_images, field) => {
        if (err) {
          return console.log(err);
        }
        else {
          var images = {
            idea_section_image_id: result_images.idea_section_image_id,
            image: result_images.image
          }

        }
      });
      //videos
      connection.query('select * from idea_section_video where idea_section_id = ?', [result.idea_section_id], (err, result_videos, field) => {
        if (err) {
          return console.log(err);
        }
        else {
          videos = []
          for (var i = 0; i < result_videos.length; i++) {
            videos.push(result_videos)

          }

        }
      });
      cusresult = []
      idea_section_id = []
      article = []
      images = []
      videos = []
      for (var i = 0; i < result.length; i++) {


        cusresult.push(result)
      }

     // console.log("v", cusresult)


      res.json({
        statuscode: 200,
        status: "Success",
        message: "Idea List Get Successfully",

        data: cusresult,
        videos: videos

      });
    }
  });
}


//Api for single idea details

exports.ideaDeatails = (req, res, next) => {
  if (!req.params.id) {
    res.json({ status: "failure", message: "Failed to update" });
} else {
let idea_section_id= req.params.id;
  connection.query('select * from idea_section where idea_section_id = ?', [req.params.id], (err, result, field) => {

    if (err) {
      return console.log(err);
    } else {
      
        connection.query('select * from idea_section_image where idea_section_id = ?', idea_section_id, (err, result_images, field) => {
          if (err) {
            res.json({statuscode:"401", status: "Failure", message: "Unable to fetch images" });
          }
          else{

          connection.query('select * from idea_section_video where idea_section_id = ?', idea_section_id, (err, result_videos, field) => {
            if (err) {
              res.json({statuscode:"401", status: "Failure", message: "Unable to fetch videos" });
            }
            else{

             var result_array = [{
              category_id: result[0].category_id,
              sub_category_id: result[0].sub_category_id,
              article: result[0].article,
              images:result_images,
              videos:result_videos,
              imgFileURL: imgFileURL,
              vdFileURL: vdFileURL
            }]
           
            console.log('result_array', result_array);

      res.json({
        statuscode: 200,
        status: "Success",
        message: "Idea List Get Successfully",
        data: result_array,
       

      });
    }

  });//end video query 

    }
  });//end image query
    } 

  });
}
}


exports.UpadteIdea = (req, res, next) => {
  body_data = JSON.parse(req.body.data);
 // console.log("req.body",body_data)
  var data = {
    category_id: body_data.category_id,
    sub_category_id: body_data.sub_category_id,
    article: body_data.article,
    created_by: body_data.created_by
  }
 // console.log("req.body",data,body_data.idea_section_id)

  var sql_query = "UPDATE `idea_section` SET ? WHERE idea_section_id= ?";
  connection.query(sql_query, [data, body_data.idea_section_id],function (err, result) {
    console.log(err);
    if (err) {
      res.json({  statuscode:"401", status: "Failure", message: "Unable to update details" });
    }
    else {
    //  console.log("result",result)

      var idea_section_id = body_data.idea_section_id
      const files = req.files
     // console.log("result",idea_section_id)
     // console.log("result",files)

      for (var i = 0; i < files.length; i++) {

        //  console.log(files);

        fieldname = req.files[i].fieldname
        filename = req.files[i].filename
        if (files[i].mimetype == 'image/png' || files[i].mimetype == 'image/jpg' || files[i].mimetype == 'image/jpeg') {
          var imges_data = {
            idea_section_id: idea_section_id,
            image: filename,
            created_by: body_data.created_by
          }
          connection.query("INSERT INTO idea_section_image set ?", imges_data, function (err, result) {
            if (err) {
              res.json({statuscode:"401", status: "Failure", message: "Unable to insert images" });
            }

          });

        }
        //store videos
        if (files[i].mimetype == 'video/mp4') {
          var video_data = {
            idea_section_id: idea_section_id,
            video: filename,
            created_by: body_data.created_by
          }
          connection.query("INSERT INTO idea_section_video set ?", video_data, function (err, result) {
            if (err) {
              res.json({statuscode:"401", status: "Failure", message: "Unable to insert images" });
            }

          });

        }
      }
      res.json({
        statuscode:"200",
        status: "Success",
        message: "Successfully update details"
      });
    }

  });

}//1

//update status api
exports.updateideaStatus = (req, res, next) => {
  body_data = req.body;
  var data = {
    status: body_data.status
  }
  var sql_query = "UPDATE `idea_section` SET ? WHERE idea_section_id= ?";
  connection.query(sql_query, [data, body_data.id], function (err, results, fields) {
      console.log(err);
      if (err) {
          res.json({statuscode:"401", status: "Failure", message: "Unable to Update Status" });
      } else {
          res.json({
            statuscode:"200",
              status: "Success",
              message: "Successfully Updated Status",
          });
      }
  });
}

//fetch all active idea section list

exports.fetch_all_active_idea_section_data = (req, res, next) => {
  let sql_query = "Select * from idea_section_image p, idea_section a,idea_section_video c where  (p.idea_section_id = a.idea_section_id AND p.idea_section_id = c.idea_section_id AND (p.status=1 AND c.status=1 AND a.status=1 ))";
  connection.query(sql_query, function (err, results, fields) {
      if (err || results.length === 0) {
          res.json({statuscode:"401", status: "Failure", message: "Unable to Fetch active Idea Section details" });
      } else {
          
          console.log(results);
          let data = {};
          let dataArray = [];
          for (let i = 0; i < results.length; i++) {
              if (data[results[i].idea_section_id] == undefined) {
                  data[results[i].idea_section_id] = {
                    idea_section_id: results[i].idea_section_id,
                      category_id: results[i].category_id,
                      sub_category_id: results[i].sub_category_id,
                      image: imgFileURL + results[i].image,
                      article: results[i].article,
                      video : vdFileURL + results[i].video,
                      created_by: results[i].created_by
                  }
                  dataArray.push(data[results[i].idea_section_id]);
              }

          }

          res.json({
            statuscode:"200",
              status: "Success",
              message: "Successfully Fetch active Idea Section details",
              imgFileURL: imgFileURL,
              vdFileURL: vdFileURL,
              data: dataArray
          });
      }
  });
}
exports.update_idea_section_status_data_by_id = (req, res, next) => {
  if (!req.params.id) {
      res.json({ status: "failure", message: "Failed to update" });
  } else {
      var sql_query = "UPDATE `idea_section` SET ? WHERE idea_section_id= ?";
      connection.query(sql_query, [req.body, req.params.id], function (err, results, fields) {
          if (err) {
              res.json({ status: "Failure", message: "Unable to Update idea section Status details" });

          } else {
              res.json({
                  status: "Success",
                  message: "Successfully Updated idea section Status details",
                  data: results
              });
          }
      });
  }

}
exports.update_idea_section_status_data_by_id = (req, res, next) => {
  if (!req.params.id) {
      res.json({ status: "failure", message: "Failed to update" });
  } else {
      var sql_query = "UPDATE `idea_section` SET ? WHERE idea_section_id= ?";
      connection.query(sql_query, [req.body, req.params.id], function (err, results, fields) {
          if (err) {
              res.json({ status: "Failure", message: "Unable to Update idea section Status details" });

          } else {
              res.json({
                  status: "Success",
                  message: "Successfully Updated idea section Status details",
                  data: results
              });
          }
      });
  }

}


