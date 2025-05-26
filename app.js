

const closedAuctions = [
    {
        title: "TP-Link Archer C6 1200 Mbps Router",
        auctionId: "BB35813",
        image: "TP-Link Archer C6 1200 Mbps Router.jpg",
        closed: true,
        winner: "MaheshMayal03",
        ended: "₹48.60"
    },
    {
        title: "maruti swift dzire zxi plus (White colour)",
        auctionId: "BB35812",
        image: "maruti swift dzire zxi plus (White colour).webp",
        closed: true,
        winner: "jaspreet4264",
        ended: "₹9.00 Lakh"
    },
    {
        title: "Lenovo Tab M11 8Gb Ram,128 Gb ROM11 Inch",
        auctionId: "BB35811",
        image: "Lenovo Tab M11 8Gb Ram,128 Gb ROM11 Inch.jpg",
        closed: true,
        winner: "daanish",
        ended: "₹32.50"
    },
    {
        title: "WD My Passport 4 TB External Hard Disk Drive",
        auctionId: "BB35810",
        image: "WD My Passport 4 TB External Hard Disk Drive.jpg",
        closed: true,
        winner: "Rikulami",
        ended: "₹8.60"
    },
    {
        title: "500 Flipcard Credits",
        auctionId: "BB35809",
        image: "500 Bidderboy Credits.png",
        closed: true,
        winner: "atulkumar",
        ended: "₹48.70"
    },
    {
        title: "Safari Thorium Neo 8 Trolley Bag",
        auctionId: "BB35806",
        image: "Safari Thorium Neo 8 Trolley Bag.jpg",
        closed: true,
        winner: "UdiptoRoy",
        ended: "₹7.40"
    },
    {
        title: "realme Buds N1 in-Ear Earbuds",
        auctionId: "BB35807",
        image: "realme Buds N1 in-Ear Earbuds.jpg",
        closed: true,
        winner: "Amol157677",
        ended: "₹21.20"
    },
    {
        title: "Air Jordan 1 Mid",
        auctionId: "BB35801",
        image: "Air Jordan 1 Mid.avif",
        closed: true,
        winner: "RITESH1301",
        ended: "₹10,000"
    },
    {
        title: "PowerMax Fitness TDM-96 (4HP Peak) Motorised Treadmill",
        auctionId: "BB35793",
        image: "PowerMax Fitness TDM-96 (4HP Peak) Motorised Treadmill.jpg",
        closed: true,
        winner: "amanshetty",
        ended: "₹44.20"
    },
    {
        title: "Epic X Baguette Rose gold",
        auctionId: "BB35804",
        image: "Epic X Baguette Rose gold.avif",
        closed: true,
        winner: "jaspreet4264",
        ended: "₹4.15"
    },
    {
        title: "boAt BassHeads 220 Super Extra Bass Wired Headset with Mic",
        auctionId: "BB35803",
        image: "boAt BassHeads 220 Super Extra Bass Wired Headset with Mic.webp",
        closed: true,
        winner: "Ayush.Khetan",
        ended: "₹16.60"
    },
    {
        title: "realme 14x 5G 8GB RAM, 128GB",
        auctionId: "BB35802",
        image: "realme 14x 5G 8GB RAM, 128GB.jpg",
        closed: true,
        winner: "jaspreet4264",
        ended: "₹154.80"
    }
];

let openAuctions = [
    {
        id: 1,
        title: "Vintage Clock",
        auctionId: "BB10001",
        desc: "Classic wooden wall clock from 1960s.",
        image: "Vintage Clock.jpg",
        currentBid: 1200,
        history: [],
        closed: false
    },
    {
        id: 2,
        title: "Antique Vase",
        auctionId: "BB10002",
        desc: "Beautiful porcelain vase, rare find.",
        image: "Antique Vase.jpg",
        currentBid: 2500,
        history: [],
        closed: false
    },
    {
        id: 3,
        title: "Apple iPhone 15 Pro Max (Black Titanium, 256 GB)",
        auctionId: "BB10003",
        desc: "Latest model, unopened box.",
        image: "pple iPhone 15 Pro Max (Black Titanium, 256 GB).jpg",
        currentBid: 8000,
        history: [],
        closed: false
    }
];

let currentUser = null;
let selectedAuctionId = null;

function showLoginBar() {
    document.getElementById('loginBar').style.display = '';
    document.getElementById('loginInput').focus();
}

function login() {
    const input = document.getElementById('loginInput').value.trim();
    if (!input) {
        showToast("Please enter a username or email.");
        return;
    }
    currentUser = input;
    document.getElementById('welcomeMsg').textContent = `Welcome, ${currentUser}!`;
    document.getElementById('loginInput').style.display = 'none';
    document.getElementById('loginBtn').style.display = 'none';
    document.getElementById('logoutBtn').style.display = '';
    document.getElementById('loginBar').style.display = '';
    renderAddProductSection();
    renderAuctions();
}
function logout() {
    currentUser = null;
    document.getElementById('welcomeMsg').textContent = '';
    document.getElementById('loginInput').value = '';
    document.getElementById('loginInput').style.display = '';
    document.getElementById('loginBtn').style.display = '';
    document.getElementById('logoutBtn').style.display = 'none';
    renderAddProductSection();
    renderAuctions();
}
window.onload = function() {
    if (currentUser) {
        document.getElementById('welcomeMsg').textContent = `Welcome, ${currentUser}!`;
        document.getElementById('loginInput').style.display = 'none';
        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('logoutBtn').style.display = '';
        document.getElementById('loginBar').style.display = '';
    } else {
        document.getElementById('welcomeMsg').textContent = '';
        document.getElementById('loginInput').style.display = '';
        document.getElementById('loginBtn').style.display = '';
        document.getElementById('logoutBtn').style.display = 'none';
        document.getElementById('loginBar').style.display = 'none';
    }
    renderAddProductSection();
    renderAuctions();
};

function renderAddProductSection() {
    const section = document.getElementById('addProductSection');
    section.innerHTML = '';
    if (!currentUser) {
        section.innerHTML = `
            <h2>Add Your Product</h2>
            <button class="login-to-add-btn" onclick="showLoginBar()">Login to add your item</button>
        `;
    } else {
        section.innerHTML = `
            <form class="add-product-form" onsubmit="event.preventDefault(); addProduct();">
                <h2>Add Your Product</h2>
                <input type="text" id="newTitle" placeholder="Product Title" required>
                <input type="text" id="newDesc" placeholder="Description" required>
                <input type="number" id="newStartBid" placeholder="Starting Bid (₹)" required>
                <input type="text" id="newImage" placeholder="Image Filename (e.g., myimage.jpg)">
                <button type="submit">Add Product</button>
            </form>
        `;
    }
}

function renderAuctions() {
    const grid = document.getElementById('itemGrid');
    grid.innerHTML = '';

    openAuctions.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.setAttribute('data-title', item.title);

        card.innerHTML = `
            <h3>${item.title}</h3>
            <div class="auction-id">Auction ID: ${item.auctionId}</div>
            <img src="${item.image}" alt="${item.title}">
            <div class="open">OPEN</div>
            <div class="current-bid">Current Bid: ₹${item.currentBid}</div>
            <div class="your-bid">Your Bid: ₹${getUserBid(item)}</div>
            <button ${!currentUser ? 'disabled title="Login to Bid"' : ''} onclick="openBidModal(${item.id})">${currentUser ? 'Place Bid' : 'Login to Bid'}</button>
        `;
        grid.appendChild(card);
    });

    closedAuctions.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.setAttribute('data-title', item.title);

        card.innerHTML = `
            <h3>${item.title}</h3>
            <div class="auction-id">Auction ID: ${item.auctionId}</div>
            <img src="${item.image}" alt="${item.title}">
            <div class="closed">CLOSED <span class="winner">${item.winner}</span></div>
            <div class="ended">Ended ${item.ended}</div>
            <button disabled>BUY NOW</button>
        `;
        grid.appendChild(card);
    });
}

function searchItems() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.item-card');
    cards.forEach(card => {
        const title = card.getAttribute('data-title').toLowerCase();
        if (title.includes(input)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}
document.getElementById('searchInput').addEventListener('input', searchItems);

function addProduct() {
    if (!currentUser) {
        showToast("Please login to add a product.");
        return;
    }
    const title = document.getElementById('newTitle').value.trim();
    const desc = document.getElementById('newDesc').value.trim();
    const startBid = parseInt(document.getElementById('newStartBid').value);
    const image = document.getElementById('newImage').value.trim() || "placeholder.jpg";
    if (!title || !desc || isNaN(startBid) || startBid < 1) {
        showToast("Please fill all fields with valid values.");
        return;
    }
    openAuctions.push({
        id: Date.now(),
        title,
        auctionId: "BB" + Math.floor(Math.random() * 90000 + 10000),
        desc,
        image,
        currentBid: startBid,
        history: [],
        closed: false
    });
    renderAddProductSection();
    renderAuctions();
    showToast("Product listed successfully!");
}

function openBidModal(id) {
    if (!currentUser) {
        showToast("Please login to place a bid.");
        return;
    }
    selectedAuctionId = id;
    const modal = document.getElementById('bidModal');
    const auction = openAuctions.find(a => a.id === id);
    document.getElementById('modalTitle').textContent = "Place Bid for " + auction.title;
    document.getElementById('modalDesc').textContent = auction.desc;
    document.getElementById('modalStatus').innerHTML = `
        <b>Current Bid:</b> ₹${auction.currentBid} <br>
        <b>Your Bid:</b> ₹${getUserBid(auction)}
    `;
    document.getElementById('bidAmount').value = '';
    renderBidHistory(auction);
    modal.style.display = 'flex';
}
function closeBidModal() {
    document.getElementById('bidModal').style.display = 'none';
    selectedAuctionId = null;
}

function submitBid() {
    if (!currentUser) {
        showToast("Please login to place a bid.");
        return;
    }
    const amount = parseInt(document.getElementById('bidAmount').value);
    const auction = openAuctions.find(a => a.id === selectedAuctionId);
    if (!auction) return;
    if (isNaN(amount) || amount <= auction.currentBid) {
        showToast("Bid must be higher than current bid.");
        return;
    }
    document.querySelector('#bidModal button').disabled = true;
    setTimeout(() => {
        auction.currentBid = amount;
        auction.history.push({ user: currentUser, amount, time: new Date().toLocaleTimeString() });
        renderAuctions();
        renderBidHistory(auction);
        document.querySelector('#bidModal button').disabled = false;
        showToast("Bid placed!");
        closeBidModal();
    }, 700);
}

function renderBidHistory(auction) {
    let html = "<b>Bid History:</b><br>";
    if (!auction.history || auction.history.length === 0) {
        html += "<i>No bids yet.</i>";
    } else {
        html += auction.history.slice().reverse().map(bid =>
            `<div>${bid.time} - <b>₹${bid.amount}</b> by ${bid.user === currentUser ? "You" : bid.user}</div>`
        ).join('');
    }
    document.getElementById('bidHistory').innerHTML = html;
}
function getUserBid(auction) {
    const userBid = auction.history ? auction.history.filter(b => b.user === currentUser) : [];
    return userBid.length ? userBid[userBid.length - 1].amount : "-";
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.className = "show";
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
}

window.onclick = function(event) {
    const modal = document.getElementById('bidModal');
    if (event.target == modal) {
        closeBidModal();
    }
};
