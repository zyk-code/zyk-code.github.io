import * as fs from 'fs';
import * as path from 'path';
/*
// 生成文件路径结构数组
*/ 

// 定义要过滤的文件夹列表
const excludedFolders = ['.github','.git', 'node_modules', ".vitepress", "public"];

// 获取过滤后的文件目录
const files = fs.readdirSync("./",{withFileTypes: true}).filter(element => {
  if(!excludedFolders.includes(element.name) && element.isDirectory() )
 {
    return element
}});

function getFilePath(files) {
  let ans = files.map(file => {
    let dir = `${file.parentPath}/${file.name}`
    if(file.isDirectory()){
      let chirFiles = fs.readdirSync(dir,{withFileTypes: true})
      return {[dir]: getFilePath(chirFiles)}
    }
    return `${file.parentPath}/${file.name}`

  })
  return ans
}

console.log(getFilePath(files, "./"))