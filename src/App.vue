<template>
  <div id="app">
		<!-- <app-header></app-header> -->
			<div class="Header">
			<el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
			 background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
				<div class="logo">
					<img src="./assets/logo.png">
				</div>
				<el-menu-item index=""><i class="el-icon-share"></i>业务主机</el-menu-item>
				<el-submenu index="2">
					<template slot="title"><i class="el-icon-s-order"></i>我的工作台</template>
					<el-menu-item index="test">test</el-menu-item>
					<el-submenu index="2-4">
						<template slot="title">copy</template>
						<el-menu-item index="copy">copy</el-menu-item>
			
					</el-submenu>
				</el-submenu>
		
				<el-dropdown class='user'>
					<span class="el-dropdown-link">
						<div class="demo-fit">
							<div class="block" :key="fits">
								<el-avatar shape="square"  :fit="fits" :src="url"></el-avatar>
							</div>
						</div>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item >首页</el-dropdown-item>
						<el-dropdown-item>退出</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-menu>
		</div>
    <!-- <router-view/> -->
		<router-view ></router-view>
  </div>
</template>

<script>
	// import Header from './components/Header'
export default {
  name: 'App',
	// components: {
	// 	'app-header': Header,
	// },
	data() {
		return {
			fits: 'fill',
			url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
			activeIndex2: '',
			tableData: [],
		}
	},
	methods: {
		//导航栏点击事件
		handleSelect(key, keyPath) {
			console.log(key, keyPath);
			let path = '/' + key
			console.log(path)
			this.$router.push(path);
		}
	},
}
</script>

<style>
.select-biz{
		margin: 20px;
	}
	.logo {
		width: 150px;
		float: left;
		margin-top: 9px;
	}

	.user {
		float: right;
		margin-top: 12px;
		margin-right: 40px;
	}

	.Header {
		margin: 5px;
	}

	.demo-table-expand {
		font-size: 0;
	}

	.demo-table-expand label {
		width: 90px;
		color: #99a9bf;
	}

	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 50%;
	}
</style>
