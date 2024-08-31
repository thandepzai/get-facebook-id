import { useState, useEffect } from 'react';

const ShareButton = () => {
  const [shared, setShared] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = () => {
    if (isSharing) {
      return;
    }

    const shareUrl = 'https://mapstudy.edu.vn/';

    if (navigator.share) {
      setIsSharing(true);

      navigator
        .share({
          title: 'Chia sẻ bài viết hay',
          url: shareUrl,
        })
        .then(() => {
          console.log('Chia sẻ thành công!');
          setShared(true);

          // Chuyển hướng sau một khoảng thời gian ngắn (ví dụ: 2 giây)
          setTimeout(() => {
            window.location.href = '/trang-moi'; // Thay '/trang-moi' bằng URL đích của bạn
          }, 2000); 
        })
        .catch((error) => {
          console.error('Chia sẻ thất bại:', error);
        })
        .finally(() => {
          setIsSharing(false);
        });
    } else {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}`,
        '_blank'
      );

      // Chuyển hướng ngay lập tức nếu không hỗ trợ Web Share API
      window.location.href = '/trang-moi'; 
    }
  };

  // Hiển thị thông báo "Đã chia sẻ!" trong một khoảng thời gian ngắn trước khi chuyển hướng
  useEffect(() => {
    if (shared) {
      const timeoutId = setTimeout(() => {
        setShared(false);
      }, 3000); // Ẩn thông báo sau 3 giây

      return () => clearTimeout(timeoutId); // Dọn dẹp timeout khi component unmount
    }
  }, [shared]);

  return (
    <div>
      <button onClick={handleShare} disabled={isSharing}>
        {isSharing ? 'Đang chia sẻ...' : 'Chia sẻ lên Facebook'}
      </button>
      {shared && <p>Đã chia sẻ!</p>}
    </div>
  );
};

export default ShareButton;