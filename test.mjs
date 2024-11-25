import { dir } from 'console';
import * as fs from 'fs';
import { text } from 'mermaid/dist/rendering-util/rendering-elements/shapes/text.js';
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
    let dir = file.parentPath ==="./" ? `./${file.name}` : `${file.parentPath}/${file.name}`
    if(file.isDirectory()){
      let chirFiles = fs.readdirSync(dir,{withFileTypes: true})
      return getFilePath(chirFiles)
    }
    return `${file.parentPath}/${file.name.slice(0,-3)}`.replace(/^\./, '')

  })
  return ans
}

function getSidebarOption(dirs) {
  console.log(dirs)
  let base = ""
  let text = ""

  let items = dirs.map(e =>{
    let dir_ = e.split("/")
    text = dir_[0]
    base = `/${dir_[0]}/`
    return {
      text: dir_[1],
      link: `./${dir_[1]}`
    }
  })
  let sidebar = [{
    text,
    base,
    items
  }]
  return sidebar
}


// console.log(getFilePath(files, "./"))
console.log(getSidebarOption(getFilePath(files, "./")[1]))