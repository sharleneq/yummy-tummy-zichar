import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
      results: [],
        datacollection: {
            labels: [],
            datasets: []
        },
        options: {
            legend: { display: true },
            title: {
              display: true,
              text: 'PSI Twenty Four Hourly (By Region)'
            },
            scales: {
              yAxes:[{
                  ticks:{
                      min: 42
                  }
              }]
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
        axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => {
            this.results = response.data

            //Add timestamp to labels
            for (let i = 0; i < this.results.items.length; i++) {
              this.datacollection.labels.push(this.results.items[i].timestamp) 
            }

            //Get list of regions ['west', 'national', 'east', 'central', 'south', 'north']
            let regions = []
            for (let i = 0; i < this.results.region_metadata.length; i++) {
              regions.push(this.results["region_metadata"][i].name)
            }
  
            //Create an object for each region. Add data to each object. Add object to datasets.
            let res ={}
            for (let i = 0; i < regions.length; i++) {
              let current_region = regions[i]
              let colors = ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#2c3e50"]
              res = {label: current_region, data: [], borderWidth: 0.5, borderColor: colors[i], fill: false}
              for (let j = 0; j < this.results.items.length; j++) {
                res.data.push(this.results.items[j].readings["psi_twenty_four_hourly"][current_region])
              }
              console.log("HI" + res.data)
              //console.log("Data for the current region " + res.data)
              this.datacollection.datasets.push(res)
            }
            this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.fetchItems()
  }
}