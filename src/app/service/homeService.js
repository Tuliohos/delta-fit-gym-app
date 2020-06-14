class HomeService {

     getMonthlyEarningsInitialLabels(){
        return ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    }

    getMonthlyEarningsInitialValues(){
        return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    monthlyEarningsDataConstructor(labels, values){
        return {
                labels: labels,
                datasets: [
                    {
                        label: 'Rendimento',
                        backgroundColor: '#42A5F5',
                        fill: true,
                        data: values
                    }
                ]
            }
    }

    getMembersGenderInitialLabels(){
        return ['Não há dados']
    }

    getMembersGenderInitialValues(){
        return [0]
    }

    membersGenderDataConstructor(labels, values){
        return {
            labels: labels,
            datasets: [
                {
                    data: values,
                    backgroundColor: [
                    "#36A2EB",
                    "#FFCE56",
                    "#FF6384"
                    ]
                }]
            };
     }

}

export default HomeService;