class GraphVisualizer
{
    constructor(id_canva) {
        this.graph = new Graph();
        this.cy = cytoscape({
            container: document.getElementById(id_canva),
            elements: [],
            style: [],
            
            style: cytoscape.stylesheet().selector('edge').css({
                'width': 3,
                'line-color': '#808080',
                'label': 'data(weight)',
                'font-size': '24px',
                'font-weight': 'bold',
                'color': 'black',
                'font-family': 'monospace'
            })
            
            .selector('node').css({
                'content': 'data(id)',
                'text-valign': 'center',
                'color': 'white',
                'font-size': '20px',
                'text-outline-width': 2,
                'text-outline-color': '#808080',
                'background-color': '#808080',
                'background-label': 'data(weight)',
                'font-family': 'monospace'
            })
            
            .selector(':selected').css({
                'background-color': 'black',
                'line-color': 'black',
                'target-arrow-color': 'black',
                'source-arrow-color': 'black',
                'text-outline-color': 'black'
            }),

            layout: {
                name: 'grid',
                rows: 1
            },
              
            minZoom: 0.5, //Минимальный зум
            maxZoom: 1.5, //Максимальный зум
        });
    }

    //Визуализируем граф
    VisualizeGraph() {
        this.cy.elements().remove(); //Удаляем то, что изображено на поле с графом
        //Вершины
        for (let node of this.graph.Nodes) {
            this.cy.add({ 
                data: { id: node.NameNode},
                position: { x: node.PositionX, y: node.PositionY },
            });
            this.cy.style().selector('#'+node.NameNode).style({
                'content': node.NameNode + node.Weight,
                'text-outline-color': node.Color,
                'background-color': node.Color
            }).update();
        }
        //Рёбра
        for (let edge of this.graph.Edges) {
            this.cy.add({ data: { id: edge.NameEdge, source: edge.Sourse, target: edge.Target, weight: edge.Weight }});
            this.cy.style().selector('#'+edge.NameEdge).style({
                'line-color': edge.Color
            }).update();
            if (edge.Weight != 0){
                this.cy.style().selector("#"+edge.NameEdge).style({
                    'label': "data(weight)",
                }).update();
            }
            else{
                this.cy.style().selector("#"+edge.NameEdge).style({
                    'label': "",
                }).update();
            }
        }
        if (this.graph.Direction === "false"){
            this.cy.style().selector('edge').style({
                'target-arrow-shape': 'none',
            }).update();
        }
        else if (this.graph.Direction === "true"){
            this.cy.style().selector('edge').style({
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier',
            }).update();
        }
    }

    //Визуализация направления рёбер
    SetDirectionEdgesCY(selectedDirection)
    {
        if (selectedDirection === "false"){
            this.cy.style().selector('edge').style({
                'target-arrow-shape': 'none',
            }).update();
        }
        else if (selectedDirection === "true"){
            this.cy.style().selector('edge').style({
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier',
            }).update();
        }
    }

    //Визуализация добавления вершин
    AddNodeCY(node){
        this.cy.add({ 
            data: { id: node.NameNode },
            position: { x: node.PositionX, y: node.PositionY }
        });
        this.cy.style().selector('#'+node.Name).style({
            'text-outline-color': node.Color,
            'background-color': node.Color
        }).update();
    }

    //Визуализация удаления вершин
    DeleteNodeCY(node){
        node.remove();
    }

    //Визуализация удаления вершин
    DeleteEdgeCY(edge){
        edge.remove();
    }
    

    //Визуализация добавления рёбер
    AddEdgeCY(edge){
        this.cy.add({ data: { id: edge.NameEdge, source: edge.Sourse, target: edge.Target, weight: edge.Weight }});
        this.cy.style().selector('#'+edge.Name).style({
            'line-color': edge.Color
        }).update();
        if (edge.Weight === 0){
            this.cy.style().selector("#"+edge.NameEdge).style({
                'label': "",
            }).update();
        }
    }

    //Визуализация установки веса для рёбер
    СhangeEdgeWeightCY(edgeName, newWeight){
        let edge = this.cy.getElementById(edgeName);
        edge.data('weight', newWeight);
        this.VisualizeGraph(this.graph)
    }
}
