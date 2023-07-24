import * as express from "express";
import * as path from 'path';
import * as fs from 'fs';



export const GetImage = async (req: express.Request, res: express.Response) =>{
    try{
        const filePath ='./uploads/'+req.params.type+'/'+ req.params.name;
        let contentType = 'text/html';
        let mimeType = path.extname(filePath);
        switch (mimeType) {
            
            case '.png': contentType = 'image/png'; break;
            case '.jpg': contentType = 'image/jpg'; break;
            case '.jpeg': contentType = 'image/jpeg'; break;
        }
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ data: 'OMFG file not found' });
        }
        fs.readFile(filePath, (error, data) => {
            // stop the execution and send nothing if the requested file path does not exist.
            if (error) return
            // otherwise, fetch and show the target image
            res.writeHead(200, { 'Content-Type': contentType })
            res.end(data, 'utf8');
        })

     }catch(error){
          console.log(error)
          return res.sendStatus(400);
     }
}
