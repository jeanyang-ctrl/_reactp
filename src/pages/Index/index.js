import React from "react";

// 导入组件
import { Carousel, Flex, Grid, WingBlank } from "antd-mobile";

// 导入axios
// import axios from "axios";
import {API} from '../../utils/api.js'
// 导入导航菜单图片
import Nav1 from "../../assets/images/nav-1.png";
import Nav2 from "../../assets/images/nav-2.png";
import Nav3 from "../../assets/images/nav-3.png";
import Nav4 from "../../assets/images/nav-4.png";

// 导入样式文件
import "./index.scss";

// 导航菜单数据
const navs = [
  {
    id: 1,
    img: Nav1,
    title: "整租",
    path: "/home/list",
  },
  {
    id: 2,
    img: Nav2,
    title: "合租",
    path: "/home/list",
  },
  {
    id: 3,
    img: Nav3,
    title: "地图找房",
    path: "/map",
  },
  {
    id: 4,
    img: Nav4,
    title: "去出租",
    path: "/rent",
  },
];

export default class Index extends React.Component {
  state = {
    // 轮播图状态数据
    swipers: [],
    isSwiperLoaded: false,
    groups: [],
    news: [],
  };

  // 获取轮播图数据的方法
  async getSwipers() {
    const res = await API.get(`/home/swiper`);
    this.setState({
      swipers: res.data.body,
      isSwiperLoaded: true,
    });
  }

  async getNews() {
    const { data: res } = await API.get(
      "/home/news?area=AREA%7C88cff55c-aaa4-e2e0"
    );
    if (res.status !== 200) {
      console.error(res.description);
      return;
    }
    this.setState({
      news: res.body,
    });
    console.log("新闻资讯", this.state.news);
  }

  async getGroups() {
    let { data: res } = await API.get("/home/groups", {
      params: {
        area: "AREA%7C88cff55c-aaa4-e2e0",
      },
    });
    // 判断返回的状态是否是成功
    if (res.status !== 200) {
      console.error(res.description);
      return;
    }
    // 把获取到的值设置给state
    this.setState({
      groups: res.body,
    });
  }

  componentDidMount() {
    this.getSwipers();
    this.getGroups();
    this.getNews();
  }
  

  // 渲染轮播图结构
  renderSwipers() {
    return this.state.swipers.map((item) => (
      <a
        key={item.id}
        href="http://itcast.cn"
        style={{
          display: "inline-block",
          width: "100%",
          height: 212,
        }}
      >
        <img
          src={`http://localhost:8080${item.imgSrc}`}
          alt=""
          style={{ width: "100%", verticalAlign: "top" }}
        />
      </a>
    ));
  }
  // 渲染导航菜单
  renderNavs() {
    return navs.map((item) => (
      <Flex.Item
        key={item.id}
        onClick={() => this.props.history.push(item.path)}
      >
        <img src={item.img} alt="" />
        <h2>{item.title}</h2>
      </Flex.Item>
    ));
  }

  renderGroups(item) {
    return (
      <Flex className="group-item" justify="around">
        <div className="desc">
          <p className="title">{item.title}</p>
          <span className="info">{item.desc}</span>
        </div>
        <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
      </Flex>
    );
  }
  renderNews() {
    return this.state.news.map((item) => (
      <div className="news-item" key={item.id}>
        <div className="imgwrap">
          <img
            className="img"
            src={`http://localhost:8080${item.imgSrc}`}
            alt=""
          />
        </div>
        <Flex className="content" direction="column" justify="between">
          <h3 className="title">{item.title}</h3>
          <Flex className="info" justify="between">
            <span>{item.from}</span>
            <span>{item.date}</span>
          </Flex>
        </Flex>
      </div>
    ));
  }
  render() {
    return (
      <div className="index">
        {/* 轮播图 */}
        <div className="swiper">
          {this.state.isSwiperLoaded ? (
            <Carousel autoplay infinite autoplayInterval={5000}>
              {this.renderSwipers()}
            </Carousel>
          ) : (
            ""
          )}
        </div>

        {/* 导航菜单 */}
        <Flex className="nav">{this.renderNavs()}</Flex>

        <div className="group">
          <h3 className="group-title">
            租房小组 <span className="more">更多</span>
          </h3>
          <Grid
            data={this.state.groups}
            columnNum={2}
            square={false}
            hasLine={false}
            renderItem={(item) => this.renderGroups(item)}
          />
        </div>
        <div className="news">
          <h3 className="group-title">最新资讯</h3>
          <WingBlank size="md">{this.renderNews()}</WingBlank>
        </div>
        <Flex className="search-box">
          {/* 左侧白色区域 */}
          <Flex className="search">
            {/* 位置 */}
            <div
              className="location"
              onClick={() => this.props.history.push("./citylist")}
            >
              <span className="name">长沙</span>
              <i className="iconfont icon-arrow" />
            </div>

            {/* 搜索表单 */}
            <div
              className="form"
              onClick={() => this.props.history.push("./search")}
            >
              <i className="iconfont icon-seach" />
              <span className="text">请输入小区或地址</span>
            </div>
          </Flex>
          {/* 右侧地图图标 */}
          <i className="iconfont icon-map" />
        </Flex>
      </div>
    );
  }
}
