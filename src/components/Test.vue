<template>
	<div>
		<ul>
			<li v-for="a in userdata">
				<h2>{{a.username}}</h2>
				<h3>{{a.name}}</h3>
			</li>
		</ul>
		<button v-on:click='funcdata'>点击</button>
		<el-dropdown>
  <span class="el-dropdown-link" type="primary">
    下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item command='one'>黄金糕</el-dropdown-item>
    <el-dropdown-item>狮子头</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
		<button @click="$router.push({path: '/'})">首页</button>
		<div class="block" style="float: left;">
			<span class="demonstration">默认</span>
			<el-date-picker v-model="value1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
			</el-date-picker>
		</div>
		<div class="block" style="float: right;">
			<span class="demonstration">带快捷选项</span>
			<el-date-picker v-model="value2" type="datetimerange" :picker-options="pickerOptions" range-separator="至"
			 start-placeholder="开始日期" end-placeholder="结束日期" align="right" @change="getSTime" value-format="yyyy-MM-dd">
			</el-date-picker>
		</div>
		<app-chart></app-chart>
		
		<app-footer></app-footer>
	</div>
</template>



<script>
	//局部调用组件
	// import Header from './Header'
	import Footer from './Footer'
	import chart from './chart'

	export default {
		name: 'App',
		data() {
			return {
				'name': '我是谁',
				userdata: [],
				pickerOptions: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
				value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
				value2: ''
			}
		},
		components: {
			// 'app-header': Header,
			'app-footer': Footer,
			'app-chart': chart
		},
		methods: {
			funcdata: function() {
				return this.$axios.get('http://jsonplaceholder.typicode.com/users')
					//箭头函数
					.then((response) => {
						this.userdata = response.data
					})
					.catch((error) => {
						console.log(error)
					})
			},
			one()  {
				const axios = require('axios');
				axios.get('http://jsonplaceholder.typicode.com/users')
					.then(response => {					
						console.log(this)
						this.userdata = response.data
						console.log(this.userdata)
						// this.$set(this.userdata,response.data)
					})
					.catch((error) => {
						console.log(error)
					})
			},
			getSTime(val) {
				console.log(val)
				//方法中调用方法
				// this.$options.methods.one()
				this.one()
				// this.$options.methods.funcdata()
			},
		},
	}
</script>


<style scoped>
	#app {
		width: 100%;
		max-width: 1200px;
		margin: 40px auto;
		padding: 0 20px;
		box-sizing: border-box;

	}

	ul {
		display: flex;
		flex-wrap: wrap;
		list-style-type: none;
		padding: 0;
	}

	li {
		flex-grow: 1;
		flex-basis: 200px;
		text-align: center;
		padding: 30px;
		border: 1px solid #222;
		margin: 10px;
	}
	 .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
