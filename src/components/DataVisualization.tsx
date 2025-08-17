import React from 'react';
import { Attraction } from '../types/attraction';
import * as echarts from 'echarts';
import ReactEChartsCore from 'echarts-for-react/lib/core';

interface DataVisualizationProps {
  attractions: Attraction[];
  currentIndex: number;
}

export const DataVisualization: React.FC<DataVisualizationProps> = ({
  attractions,
  currentIndex
}) => {
  // 创建月份访问推荐数据
  const getVisitRecommendation = () => {
    const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    const data = [30, 45, 60, 85, 95, 75, 70, 80, 90, 95, 85, 50];
    
    const option = {
      backgroundColor: 'transparent',
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: months,
        axisLine: {
          lineStyle: {
            color: '#5751D5'
          }
        },
        axisLabel: {
          color: '#161615',
          fontSize: 12
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#161615',
          fontSize: 12
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(87, 81, 213, 0.1)'
          }
        }
      },
      series: [
        {
          data: data,
          type: 'line',
          smooth: true,
          lineStyle: {
            color: '#5751D5',
            width: 3
          },
          itemStyle: {
            color: '#5751D5'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(87, 81, 213, 0.3)'
                },
                {
                  offset: 1,
                  color: 'rgba(87, 81, 213, 0.05)'
                }
              ]
            }
          },
          markPoint: {
            data: [
              {
                type: 'max',
                itemStyle: {
                  color: '#5751D5'
                }
              }
            ]
          }
        }
      ]
    };

    return option;
  };

  // 创建地理分布数据
  const getLocationDistribution = () => {
    const regions = ['北部', '南部', '东部', '西部', '中部'];
    const data = [2, 3, 2, 2, 1];
    
    const option = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      series: [
        {
          name: '景点分布',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '50%'],
          data: regions.map((region, index) => ({
            value: data[index],
            name: region,
            itemStyle: {
              color: `hsl(${245 + index * 20}, 70%, ${60 + index * 5}%)`
            }
          })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {
            color: '#161615',
            fontSize: 12
          }
        }
      ]
    };

    return option;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 最佳游览时间 */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h3 className="text-lg font-bold text-[#161615] mb-4">
          最佳游览时间 <span className="text-sm font-normal text-gray-600">Best Visiting Time</span>
        </h3>
        <div className="h-48">
          <ReactEChartsCore
            echarts={echarts}
            option={getVisitRecommendation()}
            style={{ height: '100%', width: '100%' }}
          />
        </div>
      </div>

      {/* 景点分布 */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h3 className="text-lg font-bold text-[#161615] mb-4">
          地理分布 <span className="text-sm font-normal text-gray-600">Geographic Distribution</span>
        </h3>
        <div className="h-48">
          <ReactEChartsCore
            echarts={echarts}
            option={getLocationDistribution()}
            style={{ height: '100%', width: '100%' }}
          />
        </div>
      </div>

      {/* 景点统计 */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 lg:col-span-2">
        <h3 className="text-lg font-bold text-[#161615] mb-4">
          景点概览 <span className="text-sm font-normal text-gray-600">Attractions Overview</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-black text-[#5751D5] mb-1">10</div>
            <div className="text-sm text-gray-600">Total Attractions</div>
            <div className="text-xs text-[#161615] font-medium">精选景点</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-[#5751D5] mb-1">{currentIndex + 1}</div>
            <div className="text-sm text-gray-600">Current</div>
            <div className="text-xs text-[#161615] font-medium">当前景点</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-[#5751D5] mb-1">5</div>
            <div className="text-sm text-gray-600">Regions</div>
            <div className="text-xs text-[#161615] font-medium">覆盖地区</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-[#5751D5] mb-1">365</div>
            <div className="text-sm text-gray-600">Days</div>
            <div className="text-xs text-[#161615] font-medium">全年开放</div>
          </div>
        </div>
      </div>
    </div>
  );
};
