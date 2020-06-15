import React from 'react'

import {Chart} from 'primereact/chart'
import Card from '../components/card'
import {errorMessage} from '../components/toastr'
import {Dropdown} from 'primereact/dropdown';
import FormGroup from '../components/form-group'

import HomeService from '../app/service/homeService'
import PaymentService from '../app/service/paymentService'
import MemberService from '../app/service/memberService'

import { AuthContext } from '../main/authenticationProvider'

class Home extends React.Component{

    state = {
        yearsList: [],
        selectedYear: '',
        monthlyEarningsChartData: null,
        membersGenderChartData: null
    }

    constructor(){
        super();
        this.service = new HomeService();
        this.paymentService = new PaymentService();
        this.memberService = new MemberService();
    }

    componentDidMount(){
        this.getYearsList();
        this.getMembersGenderChartData();
    }

    getYearsList(){
        this.paymentService.getYearsList()
            .then(response => {

                if(response.data.length > 0){

                        this.setState({yearsList: response.data,
                            monthlyEarningsChartData: this.service.monthlyEarningsDataConstructor(
                                this.service.getMonthlyEarningsInitialLabels(),
                                this.service.getMonthlyEarningsInitialValues()
                            )});
                }

            }).catch(error => {
                errorMessage('Erro ao carregar a lista dos anos dos pagamentos.')
            })
    }

    getMembersGenderChartData(){
        this.memberService.getMembersGenderChartData()
            .then(response => {

                if(response.data.length > 0){

                    let membersGenderChartLabels = [];
                    let membersGenderChartValues = [];

                    response.data.forEach(genderData => {
                        membersGenderChartLabels.push(this.memberService.getGenderDescription(genderData.gender));
                        membersGenderChartValues.push(genderData.amount);
                    });

                    this.setState({membersGenderChartData: 
                                this.service.membersGenderDataConstructor(membersGenderChartLabels, membersGenderChartValues)});
                }

            }).catch( error => {
                errorMessage("Falha ao carregar dados do gráfico de Gênero dos membros");
            })
    }

    getMonthlyEarnings = (e) => {
        this.paymentService.getMonthlyEarnings(e.target.value)
            .then(response => {

                let monthlyEarningChartLabels = [];
                let monthlyEarningChartValues = [];
        
                response.data.forEach(monthlyEarning => {
                    monthlyEarningChartLabels.push(this.service.getMonthDescription(monthlyEarning.month));
                    monthlyEarningChartValues.push(monthlyEarning.value);
                });

                this.setState({selectedYear: e.target.value, 
                        monthlyEarningsChartData: 
                            this.service.monthlyEarningsDataConstructor(monthlyEarningChartLabels, monthlyEarningChartValues)});
            }).catch(error => {
                errorMessage('Erro ao carregar dados do gráfico de pagamentos.')
            });
       
    }

    render(){

        const options = {
            legend: {
                position: 'top'
            },
            scales: {
                yAxes: [{
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                    ticks: {
                        min: 0
                    }
                }]
            }
        };
        
        return(
            <Card title='Gráficos'>
                <h3 className="text-center">Rendimento mensal</h3>
                <br/>
                    {
                        this.state.yearsList.length > 0 ? 
                        (
                            <>
                                <div className="row">
                                    <div className="col-md-3">
                                    <FormGroup label="Ano" htmlFor="inputYear">
                                        <Dropdown
                                            className="form-control-plaintext"
                                            value={this.state.selectedYear} 
                                            options={this.state.yearsList} 
                                            onChange={this.getMonthlyEarnings} 
                                            placeholder="Selecione um ano"/>
                                        </FormGroup>
                                    </div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col-md-12">
                                        <Chart type="bar" data={this.state.monthlyEarningsChartData} options={options} className='bg-white'/>
                                    </div>
                                </div>
                            </> 
                        ) : (
                            <p className="text-center">Não há dados para exibir</p>
                        )
                    }
                    
                <br/>
                <hr/>
                <h3 className="text-center">Gênero dos membros</h3>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                       {
                           this.state.membersGenderChartData != null ? 
                           (
                            <Chart 
                            type="pie" 
                            data={this.state.membersGenderChartData} 
                            className='bg-white'/>
                           ) : (
                               <p className="text-center">Não há dados para exibir</p>
                           )
                       }
                        
                    </div>
                </div>
            </Card>
        )
    }
}

Home.contextType = AuthContext

export default Home