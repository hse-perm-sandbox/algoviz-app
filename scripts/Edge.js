class Edge {
    constructor(Sourse, Target, Weight) {
        this.NameEdge = Sourse + "_" + Target;
        this.Sourse = Sourse;
        this.Target = Target;
        this.Weight = Weight;
        this.Color = "#808080";
    }

    //Установить вес
    SetEdgeWeight(newWeight) {
        if (this.Sourse == this.Target & newWeight != 0){
            alert("Вес петли должен быть равен 0")
        }
        else{
            this.Weight = newWeight;
        }
    }
}