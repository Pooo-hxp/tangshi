<template>
  <div class="hxp-weather">
    <div class="hxp-weather-header">
      <img src="../assets/images/icon/yu.png" alt />
      <a id="jinrishici-sentence">今日诗词展示....</a>
    </div>
    <div class="hxp-weather-footer">
      <div class="text-center hxp-weather-footer-left">
        <h2>{{air_data.real}}</h2>
        <em>{{air_data.date}}</em>
      </div>
      <div class="hxp-weather-footer-right">
        <ol>
          <li>今天：{{air_data.week}}</li>
          <li>天气：{{air_data.weather}}</li>
          <li>气温：{{air_data.lowest}}/{{air_data.highest}}</li>
          <li>风力：{{air_data.windsc}}</li>
        </ol>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "weather",
  data: function() {
    return {
      header: "http://api.tianapi.com/txapi",
      key: "?key=0c7ebab2461621aeb2c34b3a82e4c702",
      weather_weatherimg: "../assets/images/icon/",
      city: "city=郑州",
      word: "tianqi",
      air_data: "",
      url: ""
    };
  },
  mounted() {
    const url = `${this.header}/${this.word}/${this.key}&${this.city}`;
    this.$axios.get(url).then(res => {
      this.air_data = res.data.newslist[0];
      this.weather_weatherimg += this.air_data.weatherimg;
    });
  }
};
</script>
<style  scoped>
.hxp-weather {
  margin: 1rem auto;
  color: #394568;
  background: linear-gradient(to bottom, #d1d8eb 40%, #222 100%);
  border-radius: 5px;
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.25);
  width: 80%;
  height: 18rem;
  align-items: flex-end;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  font-family: "Open Sans", "Lucida Sans Unicode", "Lucida Grande", sans-serif;
}

.hxp-weather-header {
  width: 100%;
  height: 50%;
}

.hxp-weather-footer {
  width: 100%;
  height: 50%;
  background: whitesmoke;
}

.hxp-weather-footer-left,
.hxp-weather-footer-right {
  width: 50%;
  height: 5rem;
  float: left;
}
</style>