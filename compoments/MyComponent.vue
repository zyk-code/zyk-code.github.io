<template>  
  <div class="profile-container">  
    <div class="profile-card">  
      <!-- 组件内容，例如头像、名字、描述等 -->  
      <!-- <img class="profile-avatar" src="path/to/avatar.jpg" alt="Avatar">   -->
      <h2 class="profile-name">用户姓名</h2>  
      <p class="profile-description">用户描述</p>  
    </div>  
  </div>  
</template>  
  
<style scoped>  
.profile-container {  
  display: flex;  
  justify-content: center; /* 水平居中 */  
  align-items: center; /* 垂直居中 */  
  height: 100vh; /* 使容器占据整个视口高度 */  
  padding: 20px;  
  background-color: #f0f0f0; /* 淡灰色背景 */  
}  
  
.profile-card {  
  max-width: 300px; /* 设置最大宽度以适应不同屏幕 */  
  padding: 20px;  
  border-radius: 10px;  
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 添加阴影增加立体感 */  
  background-color: #fff; /* 白色背景 */  
  text-align: center; /* 使内容在卡片中居中 */  
}  
  
.profile-avatar {  
  width: 100px; /* 头像大小 */  
  height: 100px;  
  border-radius: 50%; /* 圆形头像 */  
  object-fit: cover; /* 保持图片比例并填充整个元素 */  
  margin-bottom: 10px; /* 头像和名字之间的间距 */  
}  
  
.profile-name {  
  font-size: 20px;  
  font-weight: bold;  
  margin-bottom: 5px; /* 名字和描述之间的间距 */  
}  
  
.profile-description {  
  font-size: 16px;  
  color: #666; /* 灰色描述文字 */  
}  
</style>