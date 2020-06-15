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

    getMonthDescription(month){
        switch(month){
            case 'JANUARY':
                return 'Janeiro'
            case 'FEBRUARY':
                return 'Fevereiro'
            case 'MARCH':
                return 'Março'
            case 'APRIL':
                return 'Abril'
            case 'MAY':
                return 'Maio'
            case 'JUNE':
                return 'Junho'
            case 'JULY':
                return 'Julho'
            case 'AUGUST':
                return 'Agosto'
            case 'SEPTEMBER':
                return 'Setembro'
            case 'OCTOBER':
                return 'Outubro'
            case 'NOVEMBER':
                return 'Novembro'
            case 'DECEMBER':
                return 'Dezembro'
            default: return ''
        }
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