class Node {
    constructor(NameNode, PositionX, PositionY) {
        this.NameNode = NameNode;
        this.PositionX = PositionX;
        this.PositionY = PositionY;
        this.Color = '#808080';
        this.Weight = '';
    }

    RenameNode(newName) {
        this.NameNode = newName;
    }

    ChangingСoordinates(PositionX, PositionY)
    {
        this.PositionX = PositionX;
        this.PositionY = PositionY;
    }
}