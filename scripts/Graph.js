class Graph {
    constructor() {
        this.Nodes = [];
        this.Edges = [];
        this.Direction = "false";
    }

    //Матрица смежности
    GetAdjacencyMatrix() {
        //Создали пустую матрицу, заполненную нулями
        let adjacencyMatrix = [];
        for (let i = 0; i < this.GetCountNodes(); i++) {
            adjacencyMatrix[i] = [];
            for (let j = 0; j < this.GetCountNodes(); j++) {
                adjacencyMatrix[i][j] = 0;
            }
        }

        this.Edges.map(Edge => Edge.NameEdge).forEach(edge => {
            let [sourse, target] = edge.split('_');
            let indexSourse = this.Nodes.map(Node => Node.NameNode).indexOf(sourse);
            let indexTarget = this.Nodes.map(Node => Node.NameNode).indexOf(target);
            //Смежные вершины (начальная-конечная)
            adjacencyMatrix[indexSourse][indexTarget] = 1;
            //Если граф неориентированный
            if (this.Direction === "false"){
                adjacencyMatrix[indexTarget][indexSourse] = 1;
            }
          });
          return adjacencyMatrix;
    }

    //Список смежности для взвешенного графа
    AdjacencyList() {
        let adjacencyList = {};
        for (let node of this.Nodes) {
            adjacencyList[node.NameNode] = {}
        }

        for (let edge of this.Edges){
            let [sourse, target] = edge.NameEdge.split('_');
            if (this.Direction=="true"){
                adjacencyList[sourse][target] = edge.Weight;
            }
            else{
                adjacencyList[sourse][target] = edge.Weight;
                adjacencyList[target][sourse] = edge.Weight;
            }
        }
        return adjacencyList;
    }

    //Матрица инцидентности
    GetIncidenceMatrix() {
        //Создали пустую матрицу, заполненную нулями
        let incidenceMatrix = [];
        //Строки - вершины
        for (let i = 0; i < this.GetCountNodes(); i++) {
            incidenceMatrix[i] = [];
            //Столбцы - рёбра
            for (let j = 0; j < this.GetCountEdges(); j++) {
                incidenceMatrix[i][j] = 0;
            }
        }

        this.Edges.map(Edge => Edge.NameEdge).forEach(edge => {
            let [sourse, target] = edge.split('_');
            let indexEdge = this.Edges.map(Edge => Edge.NameEdge).indexOf(edge);
            let indexSourse = this.Nodes.map(Node => Node.NameNode).indexOf(sourse);
            let indexTarget = this.Nodes.map(Node => Node.NameNode).indexOf(target);
            //Если граф неориентированный - ставим единицу у вершины и ребра, у которого есть эта вершина
            if (this.Direction === "false"){
                incidenceMatrix[indexSourse][indexEdge] = 1;
                incidenceMatrix[indexTarget][indexEdge] = 1;
            }
            else{
                //Если петля - ставим 2
                if (indexSourse==indexTarget){
                    incidenceMatrix[indexSourse][indexEdge] = 2;
                }
                else{
                    //Если вершина источник, ставим 1, иначе -1
                    incidenceMatrix[indexSourse][indexEdge] = 1;
                    incidenceMatrix[indexTarget][indexEdge] = -1;
                }
            }
          });
          return incidenceMatrix;
    }


    //Добавление вершины
    AddNode(positionX, positionY)
    {
        //Базовый список названий вершин
        let name_nodes = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"];

        //Проверяем, количество вершин в графе (их должно быть не более 20)
        if (this.GetCountNodes() < 20)
        {
            let name = "";
            for (let i = 0; i < 20; i++)
            {
                //Если ещё нет вершины с названием из базового списка, добавляем вершину именно с таким названием
                if (!this.Nodes.map(Node => Node.NameNode).includes(name_nodes[i]))
                {
                    name = name_nodes[i];
                    break;
                }
            }
            //Создаём вершину
            let newNode = new Node(name, positionX, positionY);
            //Добавляем вершину в массив вершин
            this.Nodes.push(newNode);
        }
        else
        {
            alert("Количество вершин не должно быть больше 20");
        }
    }

    //Добавление ребра
    AddEdge(source, target) {
        let newEdge = new Edge(source, target, 0)
        //Проверяем, что такого ребра нет
        let nameEdgeReverse = newEdge.Target + "_" + newEdge.Sourse;
        if ((!this.Edges.map(Edge => Edge.NameEdge).includes(newEdge.NameEdge)) & (!this.Edges.map(Edge => Edge.NameEdge).includes(nameEdgeReverse))){
            this.Edges.push(newEdge);
        }
    }

    //Удаление вершины 
    DeleteNode(nodeName) {
        //Удаляем вершину
        this.Nodes = this.Nodes.filter(node => node.NameNode !== nodeName);
        //Удаляем связанные с этой вершиной рёбра
        this.DeleteEdge(nodeName);
    }

    //Удаление ребра
    DeleteEdge(elements) {
        //Удаляем ребро, если передали название ребра
        if (this.Edges.map(Edge => Edge.NameEdge).includes(elements)){
            this.Edges = this.Edges.filter(edge => edge.NameEdge !== elements);
        }
        //Удаляем ребро, если вершина - начало ребра
        if (this.Edges.map(Edge => Edge.Sourse).includes(elements)){
            this.Edges = this.Edges.filter(edge => edge.Sourse !== elements);
        }
        //Удаляем ребро, если вершина - конец ребра
        if (this.Edges.map(Edge => Edge.Target).includes(elements)){
            this.Edges = this.Edges.filter(edge => edge.Target !== elements);
        }
    }

    //Количество вершин
    GetCountNodes(){
        return this.Nodes.length;
    }

    //Количество рёбер
    GetCountEdges(){
        return this.Edges.length;
    }

    //Установление направления рёбер
    SetDirectionEdges(selectedDirection)
    {
        this.Direction=selectedDirection;
    }

    //Пример графа
    ExampleGraph(weightEdges, direction){
        this.Nodes = [];
        this.Edges = [];
        let newNodes = [new Node("A", 401.2280890477296, 378.9006171335824), new Node("B", 481.2071111339739, 282.92579063008924), new Node("C", 622.1701375609795, 282.92579063008924), new Node("D", 482.2068489100519, 457.8799014437486), new Node("E", 622.1701375609795, 457.87990144374857), new Node("F", 699.1499463189897, 376.90114158142626)];
        for (let node of newNodes){
            this.Nodes.push(node);
        }
        let newEdges = [new Edge("A", "B", weightEdges[0]), new Edge("A", "D", weightEdges[1]), new Edge("B", "C", weightEdges[2]), new Edge("C", "A", weightEdges[3]), new Edge("C", "D", weightEdges[4]), new Edge("D", "E", weightEdges[5]), new Edge("E", "F", weightEdges[6]), new Edge("E", "C", weightEdges[7]), new Edge("F", "C", weightEdges[8])];
        for (let edge of newEdges){
            this.Edges.push(edge);
        }
        this.Direction = direction;
    }

    //Взвешенный ли
    WeightСheck(){
        let count = this.Edges.filter(edge => edge.Weight != 0).length;
        return count;
    }

    //Связный ли
    isConnectedGraph() {
        let graph = {};
        for (let edge of this.Edges) {
            let [start, end] = edge.NameEdge.split('_');
            if (graph[start]) {
                graph[start].push(end);
            } else {
                graph[start] = [end];
            }
            if (graph[end]) {
                graph[end].push(start);
            } else {
                graph[end] = [start];
            }
        }

        let visited = new Set();

        function dfs(node) {
            visited.add(node);
            if (graph[node]) {
                for (let neighbor of graph[node]) {
                    if (!visited.has(neighbor)) {
                        dfs(neighbor);
                    }
                }
            }
        }

        dfs(this.Nodes[0].NameNode);

        return visited.size === this.GetCountNodes();
        }

    //Есть ли цикл в графе
    HasCycle(edges) {
        if (this.Direction == "true"){ //Для ориентированного
            let graph = {};
    
            function buildGraph(edges) {
                for(let edge of edges) {
                    let [start, end] = edge.split('_');
                    if(!graph[start]) {
                        graph[start] = [];
                    }
                    graph[start].push(end);
                }
            }
            
            function dfs(node, visited, recStack) {
                visited[node] = true;
                recStack[node] = true;
                if(graph[node]) {
                    for(let neighbor of graph[node]) {
                        if(!visited[neighbor] && dfs(neighbor, visited, recStack)) {
                            return true;
                        } else if(recStack[neighbor]) {
                            return true;
                        }
                    }
                }
                recStack[node] = false;
                return false;
            }
            
            buildGraph(edges);
            let visited = {};
            let recStack = {};
            
            for(let node in graph) {
                if(dfs(node, visited, recStack)) {
                    return true;
                }
            }
            return false;
        }
        else{ //Для неориентированнного
            const adjacencyList = {};
  
            function hasCycleUtil(current, parent, visited) {
                visited.add(current);
            
                for (const neighbor of adjacencyList[current]) {
                if (!visited.has(neighbor)) {
                    if (hasCycleUtil(neighbor, current, visited)) {
                    return true;
                    }
                } else if (neighbor !== parent) {
                    return true;
                }
                }
            
                return false;
            }
            
            for (const edge of edges) {
                const [from, to] = edge.split('_');
                if (!adjacencyList[from]) {
                adjacencyList[from] = [];
                }
                if (!adjacencyList[to]) {
                adjacencyList[to] = [];
                }
                adjacencyList[from].push(to);
                adjacencyList[to].push(from);
            }
            
            const visited = new Set();
            
            for (const vertex in adjacencyList) {
                if (!visited.has(vertex)) {
                if (hasCycleUtil(vertex, null, visited)) {
                    return true;
                }
                }
            }
            
            return false;
        }
    }
}