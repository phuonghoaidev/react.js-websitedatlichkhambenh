import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';


class About extends Component {
    render() {
        return (
            <div className="section-share section-about">
                <div className="section-about-header">
                    Truyền thông nói về channel Booking care BV
                </div>
                <div className="section-about-content">
                    <div className="content-left">
                        <iframe width="100%" height="400px"
                            src="https://www.youtube.com/embed/OASGscJQXp0"
                            title="BookingCare: Hệ thống đặt khám trực tuyến"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen></iframe>
                    </div>
                    <div className="content-right">
                        <p>
                            Giải pháp Chuyển đổi số bệnh viện, phòng khám BookingCare_DX được phát triển theo mô hình Nền tảng như một dịch vụ (Platform as a Service - PaaS) bao gồm Website, ứng dụng di động (Mobile App) và phần mềm quản trị, tích hợp 3 trong 1 nền tảng tiện ích dễ dùng.

                            Để các đơn vị có thể trải nghiệm giải pháp trước khi quyết định sử dụng, bản dùng thử miễn phí đã sẵn sàng với thời gian dùng thử không giới hạn. Ngay bây giờ đơn vị có thể trải nghiệm phiên bản dùng thử BookingCare_DX với các tính năng dưới đây
                        </p>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
