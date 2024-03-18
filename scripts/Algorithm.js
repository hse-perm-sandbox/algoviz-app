class Algorithm
{
    constructor(graph, algorithm, args) {
        this.NumberSteps = 0;
        this.StatesGraph = [];
        this.DescriptionSteps = [];
        this.Algorithm = this.RunAlgoritm(graph, algorithm, args)
    }

    RunAlgoritm(graph, algorithm, args){
        switch (algorithm) {
            case 'kruskal':
                return this.RunKruskal(graph);
            case 'dijkstra':
                return this.RunDijkstra(graph, args[0], args[1]);
            case 'demucron':
                return this.RunDemucron(graph);
            }
        }

    RunKruskal(StartGraph){
        //Копия начального графа
        let graph = this.DeepCopy(StartGraph);

        let edges = graph.Edges; //Рассматриваем рёбра
        edges.sort((a, b) => a.Weight - b.Weight); //Сортируем рёбра по возрастанию веса

        let edgeDictionary = edges.reduce((acc, edge) => { //Словарь (название ребра: вес ребра)
            acc[edge.NameEdge] = edge.Weight;
            return acc;
        }, {});

        let edgeDictionaryString = Object.entries(edgeDictionary).map(([key, value]) => key + ': ' + value).join('\n'); //словарь, преобразованный в строку

        this.NumberSteps += 1;
        let description = this.NumberSteps + ". Упорядочим рёбра графа в порядке возрастания их весов:\n" + edgeDictionaryString;
        this.StatesGraph.push(this.DeepCopy(graph)); //Начальное состояние графа
        this.DescriptionSteps.push(description); //Описание первого шага

        //формируем массив рёбер, составляющих минимальное остовное дерево
        let minSpanningTree = [];
        for (let edge of edges){
            //Условие окончания алгоритма
            if (minSpanningTree.length < graph.GetCountNodes() - 1){
                //Проверяем ребро
                minSpanningTree.push(edge.NameEdge);
                edge.Color = "#ffa500";
                this.NumberSteps += 1;
                description = this.NumberSteps + ". Рассмотрим ребро " + edge.NameEdge;
                this.StatesGraph.push(this.DeepCopy(graph));
                this.DescriptionSteps.push(description);

                //Проверяем, образуется ли цикл
                if (!graph.HasCycle(minSpanningTree)){
                    edge.Color = "#19ff19";
                    this.NumberSteps += 1;
                    description = this.NumberSteps + ". При добавлении этого ребра в граф, цикл не образуется. Значит, добавляем ребро " + edge.NameEdge + " в остовное дерево.";
                }
                else{
                    edge.Color = "#ff0000";
                    this.NumberSteps += 1;
                    description = this.NumberSteps + ". При добавлении этого ребра в граф, образуется цикл. Пропускаем ребро " + edge.NameEdge + ".";
                    minSpanningTree.pop(edge.NameEdge);
                }
                this.StatesGraph.push(this.DeepCopy(graph));
                this.DescriptionSteps.push(description);
            }
            else{
                break;
            }
        }
        this.NumberSteps += 1;
        this.StatesGraph.push(this.DeepCopy(graph));
        this.DescriptionSteps.push(this.NumberSteps + ". Количество рёбер в получившемся графе равно " + (graph.GetCountNodes()-1) + ". Таким образом, мы получили минимальное остновное дерево. Оно выделено зелёным цветом.");
    }


    RunDijkstra(StartGraph, source, target){
        let graph = this.DeepCopy(StartGraph);
        let visitedNodes = new Set(); //Посещённые вершины
        let path = {};
        let distances = {};
        
        //Начальное состояние вершин графа
        for (let node of graph.Nodes){
            if (node.NameNode == source){
                node.Weight += "0";
                distances[node.NameNode] = 0;
            }
            else{
                node.Weight += "∞";
                distances[node.NameNode] = Infinity;
            }
        }

        this.NumberSteps += 1;
        let description = this.NumberSteps + ". Установим для каждой вершины первоначальную оценку пути до " + source + ". Для самой " + source + " оценка равна 0. Остальным вершинам присвоим бесконечность, так как мы пока не знаем их значения.";
        this.StatesGraph.push(this.DeepCopy(graph)); //Начальное состояние графа
        this.DescriptionSteps.push(description);

        let adjacencyList = graph.AdjacencyList();
        let nodeName = null;
        while (!visitedNodes.has(target)){
            let lowestDistance = Infinity;
            nodeName = null;
            for (let node of graph.Nodes){
                if (lowestDistance > distances[node.NameNode] && !visitedNodes.has(node.NameNode)){
                    lowestDistance = distances[node.NameNode];
                    nodeName = node.NameNode;
                }
            }
            if (nodeName == null){
                break;
            }

            visitedNodes.add(nodeName);

            this.NumberSteps += 1;
            description = this.NumberSteps + ". Рассмотрим вершину " + nodeName + ". Закрасим эту вершину как пройденную.\n";
            graph.Nodes.find(node => node.NameNode === nodeName).Color = "#ff9900";
            this.StatesGraph.push(this.DeepCopy(graph));
            this.DescriptionSteps.push(description);

            if (!visitedNodes.has(target)){
                let neighbors = adjacencyList[nodeName];
                if (Object.keys(neighbors).length != 0){
                    for (let key in neighbors){
                        if (!visitedNodes.has(key)){
                            this.NumberSteps += 1;
                            let newDistance = distances[nodeName] + neighbors[key];
                            description = this.NumberSteps + ". Перейдём в соседнюю вершину " + key + ".\nРасстояние от " + source + " до этой вершины составляет " + newDistance + ".\n"; 
                            graph.Edges.find(edge => (edge.NameEdge == nodeName + "_" + key || edge.NameEdge == key + "_" + nodeName)).Color = "#ff9900";
                            if (newDistance < distances[key]){
                                description += "Это расстояние (" + newDistance + ") меньше, чем оценка (" + graph.Nodes.find(node => node.NameNode === key).Weight + ") этой вершины, поэтому заменяем оценку вершины " + key + " на " + newDistance + ".";
                                graph.Nodes.find(node => node.NameNode === key).Weight = newDistance.toString();
                                distances[key] = newDistance;
                                path[key] = nodeName;
                            }
                            else if (newDistance == distances[key]){
                                description += "Это расстояние (" + newDistance + ") равно оценке (" + graph.Nodes.find(node => node.NameNode === key).Weight + ") этой вершины, поэтому ничего не меняем.";   
                            }
                            else{
                                description += "Это расстояние (" + newDistance + ") больше, чем оценка (" + graph.Nodes.find(node => node.NameNode === key).Weight + ") этой вершины, поэтому ничего не меняем.";
                            }
                            this.StatesGraph.push(this.DeepCopy(graph));
                            this.DescriptionSteps.push(description);
                        }
                    }
                }
                else{
                    this.NumberSteps += 1;
                    description = this.NumberSteps + ". У вершины " + nodeName + " нет соседей. Переходим к следующей вершине.";
                    this.StatesGraph.push(this.DeepCopy(graph));
                    this.DescriptionSteps.push(description);
                }
            }
        }

        if (nodeName == target){
            this.NumberSteps += 1;
            description = this.NumberSteps + ". Мы дошли до конечной вершины " + target + ".\nВосстановим путь от вершины " + source + " до вершины " + target + ".";
            graph.Nodes.find(node => node.NameNode === source).Color = "#ff0000";
            graph.Nodes.find(node => node.NameNode === target).Color = "#ff0000";
            this.StatesGraph.push(this.DeepCopy(graph));
            this.DescriptionSteps.push(description);

            let shortPath = [];
            let current = target;
            while (current != source){
                let currentWithDistance = {[current]: distances[current]};
                shortPath.unshift(currentWithDistance);
                current = path[current];
            }

            this.NumberSteps += 1;
            description = this.NumberSteps + ". Длина пути: ";
            shortPath.unshift({[source]: 0});
            current = source;
            for (let node of shortPath){
                if (Object.keys(node)[0] != source){
                    if (Object.keys(node)[0] != target){
                        description += graph.Edges.find(edge => (edge.NameEdge === current + "_" + Object.keys(node)[0] || edge.NameEdge === Object.keys(node)[0] + "_" + current)).Weight + "(" + graph.Edges.find(edge => (edge.NameEdge === current + "_" + Object.keys(node)[0] || edge.NameEdge === Object.keys(node)[0] + "_" + current)).NameEdge + ")" + " + ";
                    }
                    else{
                        description += graph.Edges.find(edge => (edge.NameEdge === current + "_" + Object.keys(node)[0] || edge.NameEdge === Object.keys(node)[0] + "_" + current)).Weight + "(" + graph.Edges.find(edge => (edge.NameEdge === current + "_" + Object.keys(node)[0] || edge.NameEdge === Object.keys(node)[0] + "_" + current)).NameEdge + ")";
                    }
                    graph.Edges.find(edge => (edge.NameEdge === current + "_" + Object.keys(node)[0] || edge.NameEdge === Object.keys(node)[0] + "_" + current)).Color = "#ff0000";
                    current = Object.keys(node)[0];
                }
            }
            description += " = " + graph.Nodes.find(node => node.NameNode === target).Weight;
            this.StatesGraph.push(this.DeepCopy(graph));
            this.DescriptionSteps.push(description);
        }
        else{
            this.NumberSteps += 1;
            description = this.NumberSteps + ". Попали в тупик. До вершины " + target + " из вершины " + source + " пути не существует."
            this.StatesGraph.push(this.DeepCopy(graph));
            this.DescriptionSteps.push(description);
        }
    }

    RunDemucron(StartGraph){
        let graph = this.DeepCopy(StartGraph);
        let count = 0;
        let description = "";

        //Пока не удалили все рёбра
        while (graph.GetCountEdges() != 0){
            this.NumberSteps += 1;
            description = this.NumberSteps + ". Пронумеруем все вершины, которые являются только источниками. А также удалим рёбра, исходящие из них.";
            this.StatesGraph.push(this.DeepCopy(graph));
            this.DescriptionSteps.push(description);
            for (let node of graph.Nodes){
                if (graph.Edges.map(Edge => Edge.Sourse).includes(node.NameNode) & !graph.Edges.map(Edge => Edge.Target).includes(node.NameNode)){
                    this.NumberSteps += 1;
                    count += 1;
                    description = this.NumberSteps + ". Вершина " + node.NameNode + " является источником в текущем графе. Присвоем ей номер " + count + ". Удалим рёбра, исходящие из неё.";  
                    graph.Nodes.find(obj => obj.NameNode === node.NameNode).Weight = count;
                    graph.Nodes.find(obj => obj.NameNode === node.NameNode).Color = "#00008b";
                    graph.DeleteEdge(node.NameNode);
                    this.StatesGraph.push(this.DeepCopy(graph));
                    this.DescriptionSteps.push(description);
                }
            }
        }

        this.NumberSteps += 1;
        description = this.NumberSteps + ". Пронумеруем оставшиеся вершины.\n"
        this.StatesGraph.push(this.DeepCopy(graph));
        this.DescriptionSteps.push(description);

        for (let node of graph.Nodes){
            if (node.Weight == ""){
                this.NumberSteps += 1;
                count += 1;
                description = this.NumberSteps + ". " + node.NameNode + ": " + count;
                graph.Nodes.find(obj => obj.NameNode === node.NameNode).Weight = count;
                graph.Nodes.find(obj => obj.NameNode === node.NameNode).Color = "#00008b";
                this.StatesGraph.push(this.DeepCopy(graph));
                this.DescriptionSteps.push(description);
            }
        }

        this.NumberSteps += 1;
        description = this.NumberSteps + ". Таким образом мы указали такой линейный порядок графа на его вершинах, что любое ребро ведёт от вершины с меньшим номером к вершине с большим номером."
        graph.Edges = this.DeepCopy(StartGraph).Edges;
        this.StatesGraph.push(this.DeepCopy(graph));
        this.DescriptionSteps.push(description);
    }


    //Глубокая копия
    DeepCopy(graph){
        let graphCopy = new Graph();
        let stucture = JSON.parse(JSON.stringify(graph));
        graphCopy.Nodes = stucture.Nodes;
        graphCopy.Edges = stucture.Edges;
        graphCopy.Direction = stucture.Direction;
        return graphCopy;
    }
}