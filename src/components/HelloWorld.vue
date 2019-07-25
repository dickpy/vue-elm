<template>
	<div class="Header">
		<div>
			<p style="float: left;margin: 30px 0 0 30px;">蓝鲸业务 ： </p>
			<el-select class='select-biz' v-model="value" filterable placeholder="请选择业务" @change='biz_select'>
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
		</div>
		
		<el-table :data="tableData" style="width: 100%">
			<el-table-column type="expand">
				<template slot-scope="props">
					<el-form label-position="left" inline class="demo-table-expand">
						<el-form-item label="IP:">
							<span>{{ props.row.ip }}</span>
						</el-form-item>
						<el-form-item label="主机名称:">
							<span>{{ props.row.host_name }}</span>
						</el-form-item>
						<el-form-item label="磁盘容量:">
							<span>{{ props.row.bk_disk }}</span>
						</el-form-item>
						<el-form-item label="操作系统名称:">
							<span>{{ props.row.os_name }}</span>
						</el-form-item>
						<el-form-item label="cpu频率:">
							<span>{{ props.row.cpu }}</span>
						</el-form-item>
						<el-form-item label="cpu核心数:">
							<span>{{ props.row.cpu_data }}</span>
						</el-form-item>
						<el-form-item label="内存容量:">
							<span>{{ props.row.ram }}</span>
						</el-form-item>
					</el-form>
				</template>
			</el-table-column>
			<el-table-column label="IP" prop="ip">
			</el-table-column>
			<el-table-column label="主机名称" prop="host_name">
			</el-table-column>
			<el-table-column label="磁盘容量" prop="bk_disk">
			</el-table-column>
		</el-table>
		<p class="prompt_p">&nbsp;&nbsp;&nbsp;内存与磁盘容量</p>
		<div class="myChart" id="myChart">
		</div>
		
	</div>
	
</template>

<script>

	export default {
		data() {
			return {
				fits: 'fill',
				url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
				activeIndex: '1',
				activeIndex2: '1',
				tableData: [],
				options: [{
					value: '2',
					label: '蓝鲸'
				}, {
					value: '3',
					label: 'lucky'
				}, {
					value: '4',
					label: '麻花藤'
				}],
				value: '',
				//折线图
				// seven_chart: null,
				legend_data: [],
				series_data: [],
			}
		},
		
		methods: {
			get_echarts() {
				// 基于准备好的dom，初始化echarts实例
				let myChart = this.echarts.init(document.getElementById('myChart'))	
					
				myChart.clear(this.option); 
				// 绘制图表
				myChart.setOption({
					title: {
						subtext: '数据来自配置平台api'
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					legend: {
						data: this.legend_data
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: {
						type: 'value',
						boundaryGap: [0, 0.01]
					},
					yAxis: {
						type: 'category',
						data: ['内存容量', '磁盘容量']
					},
					series: this.series_data
					// series: [
					// 	{
     //        name: '192.168.102.222',
     //        type: 'bar',
     //        data: [18203, 23489]
     //    }
					// ]
				});
			},
			//表格
			biz_select(val) {
				console.log(val)
				const axios = require('axios');
				axios.get('http://dev.minibk.com:8000/host_disk/', {
						params: {
							biz_id: val
						}
					})
					.then(response => {
						this.tableData = response.data.data			
						// this.$set(this.userdata,response.data)
						//渲染折线图
						this.series_data = []
						let legend_data_ = []
						let series_data_ = []
						let api_data = response.data.data
						let str = {}
						for (var i = 0; i < response.data.data.length; i++) {
							legend_data_.push(api_data[i].ip)
							str = {
								name: api_data[i].ip,
								type: 'bar',
								data: [api_data[i].bk_disk, api_data[i].ram]
							}
							series_data_.push(str)
						}
						//重新赋值
						this.legend_data = legend_data_
						this.series_data = series_data_
						console.log(series_data_)
						console.log(this.series_data)
						this.get_echarts()
					})
					.catch((error) => {
						console.log(error)
					})
			},
			//导航栏点击事件
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
				let path = '/' + key
				console.log(path)
				this.$router.push(path);
			}
		},
		//钩子(初始化调用)
		mounted: function() {
			this.biz_select(2)
			this.get_echarts();
		},
		// beforeDestroy() {
		// 	if (!this.seven_chart) {
		// 		return
		// 	}
		// 	this.seven_chart.dispose();
		// 	this.seven_chart = null;
		// },
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.myChart {
		height: 11rem;
		width: 94%;
	}

	.select-biz {
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
