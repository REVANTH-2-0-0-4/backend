
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
        row.forEach((square, colind) => {
            const squareelement = document.createElement("div");
            squareelement.classList.add("square",
                ((rowind + colind) % 2 === 0 ? "light" : "dark")
            )
            squareelement.dataset.row = rowind;
            squareelement.dataset.col = colind;
            if (square) {
                const pieceelement = document.createElement("div");

                pieceelement.classList.add("piece", square.color === "w" ? "white" : "black");
                pieceelement.innerText = getpieceunicode(square);
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
                        col: parseInt(squareelement.dataset.col),
                    }
                    handlemove(sourcesquare, targetsource);

                }
            })

            boardelement.append(squareelement);
        })
    });
}
if (playerrole === 'b') {
    boardelement.classList.add("flipped");
}
else {
    boardelement.classList.remove("flipped");
}
const handlemove = (source, target) => {
    const move = {
        from: `${String.fromCharCode(97 + source.col)}${8 - source.row}`,
        to: `${String.fromCharCode(97 + target.col)}${8 - target.row}`,
        promotion: 'q'
    }
    socket.emit("move", move);
}
const getpieceunicode = (piece) => {
    const unicodepieces = {
        'wP': '\u2659',
        'wN': '\u2658',
        'wB': '\u2657',
        'wR': '\u2656',
        'wQ': '\u2655',
        'wK': '\u2654',
        'bP': '\u2659',
        'bN': '\u265E',
        'bB': '\u265D',
        'bR': '\u265C',
        'bQ': '\u265B',
        'bK': '\u265A'
    }

    // Combine color and type to get the correct piece
    const pieceKey = piece.color + piece.type.toUpperCase();
    return unicodepieces[pieceKey] || "";
}
socket.on("playerrole", (role) => {
    playerrole = role;
    renderboard();
})
socket.on("spectator", () => {
    playerrole = null;
    renderboard();
})
socket.on("boardstate", (fen) => {
    chess.load(fen);
    renderboard();
})
socket.on("move", (move) => {
    chess.move(move);
    renderboard();
})

renderboard();

