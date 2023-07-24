import * as express from "express";
import * as fs from 'fs';


export const Stream = async (req: express.Request, res: express.Response) =>{
   
    try{
        const filePath ='./uploads/'+req.params.type+'/'+ req.params.name;
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ data: 'OMFG file not found' });
        }
        const stat = fs.statSync(filePath);
        const fileSize = stat.size;
        const range = req.headers.range;
        if (range) {
            let parts = range.replace(/bytes=/, '').split('-');
            let start = parseInt(parts[0], 10);
            let end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            let chunkSize = end - start + 1;
            let file = fs.createReadStream(filePath, {
              start,
              end,
            });
            let headers = {
              'Content-Range': `bytes ${start}-${end}/${fileSize}`,
              'Accept-Ranges': 'bytes',
              'Content-Length': chunkSize,
              'Content-Type': 'video/mp4',
            };
        
            res.writeHead(206, headers);
            file.pipe(res);
          } else {
            const head = {
              'Content-Length': fileSize,
              'Content-Type': 'video/mp4',
            };
            res.writeHead(200, head);
            fs.createReadStream(filePath).pipe(res);
          }
    }catch(error){
         console.log(error)
         return res.sendStatus(400);
    }
}