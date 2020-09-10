<template>
  <div class="post" @click="$router.push(`/post-detail/${post.id}`)">
      <div class="video-post" v-if="post.type ===2 ">
          <div class="title">{{post.title}}</div>
          <div class="video">
              <span class="iconfont iconshipin"></span>
              <img :src="$url(post.cover[0].url)" alt="">
          </div>
          <div class="user">
                      <span>{{post.user.nickname}}</span>
                      <span>{{post.comment_length}}跟帖</span>
                  </div>
      </div>
      <div class="single-img-post" v-if="post.cover.length<3">
          <div class="info">
                  <div class="title">{{post.title}}</div>
                  <div class="user">
                      <span>{{post.user.nickname}}</span>
                      <span>{{post.comment_length}}跟帖</span>
                  </div>
              </div>
              <div v-if="post.cover.length" class="img">
                  <img  :src='$url(post.cover[0].url)' alt="">
              </div>
      </div>
      <div class="multiple-img-post" v-else-if='post.cover.length'>
          <div class="title">{{post.title}}</div>
          <div class="imgs">
              <img :src="$url(post.cover[0].url)" alt="">
              <img :src="$url(post.cover[1].url)" alt="">
              <img :src="$url(post.cover[2].url)" alt="">
          </div>
          <div class="user">
                      <span>{{post.user.nickname}}</span>
                      <span>{{post.comment_length}}跟帖</span>
                  </div>
      </div>
  </div>
</template>

<script>
export default {
  created () {
    console.log(this.post)
  },
  props: {
    post: Object
  }
}
</script>

<style lang='less' scoped>
.user{
    color: #666;
    font-size: 14px;
    span:first-child {
        margin-right: 10px;
    }
}
.single-img-post{
        border-bottom: 1px solid #ccc;
        padding: 10px;
        display: flex;
        .info{
            flex: 1;
            font-size: 16px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
           }
        .img{
            img{
                width: 120px;
                height: 74px;
                //类似于background-size,cover缺点会有一部分会截取掉
                //contain保证图片的完整显示但会后留白
                object-fit: cover ;
            }
        }
}
 .multiple-img-post{
        border-bottom: 1px solid #ccc;
        padding: 20px;
        .title{
            font-size: 16px;
        }
        .imgs{
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            img{
            width: 100px;
            height: 74px;
            }
        }
        .user{
        color: #666;
        font-size: 14px;
        span:first-child {
            margin-right: 10px;
        }
      }
}
.video-post{
    border-bottom: 1px solid #ccc;
    padding: 10px;
    .title {
    font-size: 16px;
  }
  .video {
    position: relative;
    padding: 10px 0;
    img {
      width: 100%;
      height: 170px;
      object-fit: cover;
    }
    span {
      position: absolute;
      width: 50px;
      height: 50px;
      background-color: rgba(255, 255, 255, .5);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      text-align: center;
      line-height: 50px;
      font-size: 24px;
    }
  }
}
</style>
