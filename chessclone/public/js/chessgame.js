
const socket = io();
const chess = new Chess();
const boardelement = document.querySelector(".chessboard");
let draggedpiece = null;
let sourcesquare = null;
let playerrole = null;
const renderboard = () => {
    const board = chess.board();
    boardelement.innerHTML = "";
    board.forEach((row, rowind) => {
        board.forEach((square, colind) => {
            const squareelement = document.createElement("div");
            squareelement.classList.add("square",
                ((rowind + colind) % 2 === 0 ? "light" : "dark")
            )
            squareelement.dataset.row = rowind;
            squareelement.dataset.col = colind;
            if (square) {
                const pieceelement = document.createElement("div");
                pieceelement.classList.add("piece", square.color === "W" ? "white" : "black");
                pieceelement.innerText = "";
                pieceelement.draggable = (playerrole === square.color);
                pieceelement.addEventListener("dragstart", (e) => {
                    if (pieceelement.draggable) {
                        draggedpiece = pieceelement;
                        sourcesquare = { row: rowind, col: colind };
                    }
                    e.dataTransfer.setData("text/plain", "");
                })
                pieceelement.addEventListener("dragend", (e) => {
                    draggedpiece = null;
                    sourcesquare = null;
                })
                squareelement.append(pieceelement);

            }
            squareelement.addEventListener("dragover", (e) => {
                e.preventDefault();
            })
            squareelement.addEventListener("drop", () => {
                e.preventDefault();
                if (draggedpiece) {
                    const targetsource = {
                        row: parseInt(squareelement.dataset.row),
                        col: parseIn(squareelement.dataset.col),
                    }
                    handlemove(sourcesquare, targetsource);

                }
            })

            boardelement.append(squareelement);
        })
    });
}
const handlemove = () => {

}
const getpieceunicode = () => {

}
renderboard();

