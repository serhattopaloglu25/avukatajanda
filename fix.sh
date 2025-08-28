#!/bin/bash
echo "🚀 Backend Python→Node.js Fix"
[ -f "main.py" ] && mv main.py main.py.disabled
echo "{\"name\":\"avukatajanda\",\"main\":\"server.js\",\"scripts\":{\"start\":\"node server.js\"},\"dependencies\":{\"express\":\"^4.18.2\",\"cors\":\"^2.8.5\"}}" > package.json
echo "const express=require(\"express\");const cors=require(\"cors\");const app=express();app.use(cors());app.use(express.json());app.get(\"/health\",(req,res)=>{res.json({status:\"OK\",runtime:\"Node.js Express\"})});app.get(\"/\",(req,res)=>{res.json({success:true,message:\"Node.js API\"})});app.listen(process.env.PORT||10000,\"0.0.0.0\",()=>console.log(\"API running\"));" > server.js
git add .
git commit -m "Backend Python→Node.js"
git push origin main
echo "✅ Backend fixed!"
