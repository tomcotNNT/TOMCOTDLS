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

// Xử lý bộ lọc tìm kiếm nâng cấp: Giá, Loại acc và Từ khóa ID / #Hashtag
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

        // 1. Kiểm tra từ khóa tìm kiếm (ID hoặc #CầuThủ)
        if (searchVal !== '') {
            matchSearch = searchText.includes(searchVal);
        }

        // 2. Kiểm tra điều kiện lọc Giá (5 mức giá)
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

        // 3. Kiểm tra điều kiện lọc Loại Acc
        if (typeVal !== 'all') {
            matchType = (type === typeVal);
        }

        // Hiển thị hoặc ẩn card phù hợp
        if (matchSearch && matchPrice && matchType) {
            card.style.display = 'block';
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

// Đóng modal khi bấm ra ngoài vùng khung nội dung
window.onclick = function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeGallery();
    }
}