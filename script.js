// Hiệu ứng trượt banner tự động ở sảnh chính mỗi 3 giây
let currentSlide = 0;
const slides = document.querySelectorAll('.banner-slide');

function nextSlide() {
    if (slides.length === 0) return;
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

if (slides.length > 0) {
    setInterval(nextSlide, 3000);
}

// === CƠ SỞ DỮ LIỆU MẪU NÂNG CẤP CẦU THỦ THEO VỊ TRÍ ===
// (Bạn có thể dễ dàng thay đổi đường dẫn ảnh vào các thư mục tương ứng trên máy)
const upgradeDatabase = [
    {
        position: "CF",
        name: "Mẫu nâng cấp Tiền đạo cắm (CF - ST)",
        desc: "Build max tốc độ, sút xa và chọn vị trí",
        image: "images/upgrades/cf_sample.jpg" // Hoặc link ảnh thực tế của bạn
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

    // Lọc các mẫu phù hợp với từ khóa vị trí người chơi nhập
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

    // Hiển thị danh sách ảnh mẫu nâng cấp xổ ra
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

// Xử lý bộ lọc tìm kiếm Acc theo Giá và Loại tài khoản
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
            // Hỗ trợ check nếu acc thuộc nhiều loại (VD: "coin player")
            matchType = type.includes(typeVal);
        }

        if (matchSearch && matchPrice && matchType) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// Hàm chuyển đổi ảnh trên card sản phẩm chính
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

// === CÁC HÀM XỬ LÝ MODAL XEM BỘ SƯU TẬP ẢNH NGANG CHI TIẾT ===
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

window.onclick = function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeGallery();
    }
}