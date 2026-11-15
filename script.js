// === QUẢN LÝ CHUNG SLIDER BANNER VÀ BACKGROUND HERO ===
let currentBannerIndex = 0;
const bannerSlides = document.querySelectorAll('.banner-slide');
const heroBgSlides = document.querySelectorAll('.hero-bg-slide');

function nextSlide() {
    // 1. Chạy slider cho Banner nhỏ bên trong sảnh chính
    if (bannerSlides.length > 0) {
        bannerSlides[currentBannerIndex].classList.remove('active');
        currentBannerIndex = (currentBannerIndex + 1) % bannerSlides.length;
        bannerSlides[currentBannerIndex].classList.add('active');
    }

    // 2. Chạy slider cho Ảnh nền Hero Background (xoay vòng bộ 6 ảnh BACKGROUND)
    if (heroBgSlides.length > 0) {
        let activeBgIndex = Array.from(heroBgSlides).findIndex(slide => slide.classList.contains('active'));
        if (activeBgIndex !== -1) {
            heroBgSlides[activeBgIndex].classList.remove('active');
            let nextBgIndex = (activeBgIndex + 1) % heroBgSlides.length;
            heroBgSlides[nextBgIndex].classList.add('active');
        }
    }
}

// Kích hoạt vòng lặp chuyển slide tự động mỗi 4 giây
if (bannerSlides.length > 0 || heroBgSlides.length > 0) {
    setInterval(nextSlide, 4000);
}


// === CƠ SỞ DỮ LIỆU MẪU NÂNG CẤP CẦU THỦ THEO VỊ TRÍ ===
const upgradeDatabase = [
    {
        position: "CF",
        name: "Mẫu nâng cấp Tiền đạo cắm (CF - ST)",
        desc: "Build max tốc độ, sút xa và chọn vị trí",
        image: "images/upgrades/cf_sample.jpg" 
    },
    {
        position: "CB",
        name: "Mẫu nâng cấp Trung vệ thép (CB)",
        desc: "Build max thể lực, chiều cao và tắc bóng",
        image: "images/upgrades/cb_sample.jpg"
    },
    {
        position: "CM",
        name: "Mẫu nâng cấp Tiền vệ trung tâm (CM - CDM - CAM)",
        desc: "Build toàn diện chuyền bóng và thể lực",
        image: "images/upgrades/cm_sample.jpg"
    },
    {
        position: "GK",
        name: "Mẫu nâng cấp Thủ môn huyền thoại (GK)",
        desc: "Tối ưu hóa phản xạ và chiều cao bắt bóng",
        image: "images/upgrades/gk_sample.jpg"
    },
    {
        position: "LW",
        name: "Mẫu nâng cấp Tiền đạo cánh tốc độ (LW - RW)",
        desc: "Build tối đa tốc độ, tăng tốc và tạt bóng",
        image: "images/upgrades/wing_sample.jpg"
    }
];

// Hàm tìm kiếm mẫu nâng cấp theo vị trí
function searchUpgradePosition() {
    const query = document.getElementById('positionSearchInput').value.toUpperCase().trim();
    const grid = document.getElementById('upgradeResultsGrid');
    
    if (query === "") {
        grid.innerHTML = `
            <div class="no-result-text">
                <i class="fa-solid fa-hand-pointer"></i>
                <p>Hãy nhập hoặc chọn vị trí phía trên để hiển thị mẫu nâng cấp cầu thủ tương ứng!</p>
            </div>
        `;
        return;
    }

    const results = upgradeDatabase.filter(item => item.position.includes(query) || item.name.toUpperCase().includes(query));

    if (results.length === 0) {
        grid.innerHTML = `
            <div class="no-result-text">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <p>Chưa có mẫu nâng cấp cho vị trí <strong>"${query}"</strong> này. Vui lòng thử lại với các vị trí: CF, CB, CM, GK, LW...</p>
            </div>
        `;
        return;
    }

    let htmlContent = "";
    results.forEach(item => {
        htmlContent += `
            <div class="upgrade-card">
                <div class="upgrade-card-img">
                    <img src="${item.image}" alt="${item.name}" onclick="openGallery('UPGRADE', ['${item.image}'])" title="Bấm để xem phóng to ảnh">
                </div>
                <div class="upgrade-card-info">
                    <h4>${item.name}</h4>
                    <p>Vị trí chuẩn: #${item.position} — ${item.desc}</p>
                </div>
            </div>
        `;
    });

    grid.innerHTML = htmlContent;
}

// Hàm bấm nhanh vào các thẻ tag vị trí
function quickSelectPos(pos) {
    document.getElementById('positionSearchInput').value = pos;
    searchUpgradePosition();
}


// === XỬ LÝ BỘ LỌC TÌM KIẾM TÀI KHOẢN ACC ===
function filterProducts() {
    const searchVal = document.getElementById('searchInput').value.toLowerCase().trim();
    const priceVal = document.getElementById('priceFilter').value;
    const typeVal = document.getElementById('typeFilter').value;
    const cards = document.querySelectorAll('.product-card');

    cards.forEach(card => {
        const price = parseInt(card.getAttribute('data-price'));
        const type = card.getAttribute('data-type');
        const searchText = card.getAttribute('data-search').toLowerCase();

        let matchSearch = true;
        let matchPrice = true;
        let matchType = true;

        if (searchVal !== '') {
            matchSearch = searchText.includes(searchVal);
        }

        if (priceVal === 'under200') {
            matchPrice = price < 200000;
        } else if (priceVal === '200to500') {
            matchPrice = price >= 200000 && price <= 500000;
        } else if (priceVal === '500to1m') {
            matchPrice = price > 500000 && price <= 1000000;
        } else if (priceVal === '1mto2m') {
            matchPrice = price > 1000000 && price <= 2000000;
        } else if (priceVal === 'over2m') {
            matchPrice = price > 2000000;
        }

        if (typeVal !== 'all') {
            matchType = type.includes(typeVal);
        }

        if (matchSearch && matchPrice && matchType) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}


// === HÀM TRƯỢT ẢNH TRỰC TIẾP TRÊN CARD SẢN PHẨM ===
function changeCardSlide(accId, direction) {
    const sliderBox = document.getElementById('slider-' + accId);
    if (!sliderBox) return;
    
    const cardSlides = sliderBox.querySelectorAll('.acc-slide');
    let currentIndex = 0;
    
    cardSlides.forEach((slide, index) => {
        if (slide.classList.contains('active')) {
            currentIndex = index;
        }
    });
    
    cardSlides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + direction + cardSlides.length) % cardSlides.length;
    cardSlides[currentIndex].classList.add('active');
}


// === XỬ LÝ MODAL XEM BỘ SƯU TẬP ẢNH NGANG CHI TIẾT ===
let currentGalleryImages = [];
let currentGalleryIndex = 0;

function openGallery(accId, imageArray) {
    currentGalleryImages = imageArray;
    currentGalleryIndex = 0;
    
    document.getElementById('modalAccId').innerText = '#' + accId;
    
    const wrapper = document.getElementById('galleryImagesWrapper');
    wrapper.innerHTML = '';
    
    imageArray.forEach((imgSrc, index) => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.className = 'gallery-img' + (index === 0 ? ' active' : '');
        wrapper.appendChild(img);
    });
    
    document.getElementById('imageModal').style.display = 'flex';
}

function closeGallery() {
    document.getElementById('imageModal').style.display = 'none';
}

function slideGallery(direction) {
    if (currentGalleryImages.length === 0) return;
    
    const imgs = document.querySelectorAll('.gallery-img');
    imgs[currentGalleryIndex].classList.remove('active');
    
    currentGalleryIndex = (currentGalleryIndex + direction + currentGalleryImages.length) % currentGalleryImages.length;
    
    imgs[currentGalleryIndex].classList.add('active');
}

// Đóng modal khi bấm ra vùng nền tối bên ngoài
window.onclick = function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeGallery();
    }
}