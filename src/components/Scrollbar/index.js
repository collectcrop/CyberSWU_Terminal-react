import React, { useEffect, useRef } from 'react';
import { 
    OverlayScrollbars, 
    ScrollbarsHidingPlugin, 
    SizeObserverPlugin, 
    ClickScrollPlugin 
  } from 'overlayscrollbars';
import 'overlayscrollbars/overlayscrollbars.css';

const Scrollbar = ({ children, className = '', options = {} }) => {
    const scrollRef = useRef(null);
    useEffect(() => {
      if (scrollRef.current) {
        // 初始化 OverlayScrollbars
        OverlayScrollbars(scrollRef.current, {
          className: 'os-theme-light', // 你可以在这里设置滚动条的主题
          resize: 'both', // 支持大小调整
          sizeAutoCapable: true, // 自动调整滚动条的大小
          paddingAbsolute: true, // 使用绝对定位填充
          ...options, // 合并传递的配置
        });
      }
  
      // 在组件销毁时清理
      return () => {
        if (scrollRef.current) {
          const osInstance = OverlayScrollbars(scrollRef.current);
          osInstance.destroy();
        }
      };
    }, [options]);
  
    return (
        <div data-overlayscrollbars-initialize
        ref={scrollRef}
        className={`relative w-full h-full ${className} os-scrollbar os-scrollbar-auto-hide os-scrollbar-handle-interactive os-scrollbar-cornerless os-scrollbar-unusable`}
        data-overlayscrollbars="host"
        >
        <div data-overlayscrollbars-contents="" data-overlayscrollbars-viewport="scrollbarHidden overflowXHidden overflowYScroll" tabIndex="-1">
        {children}
        </div>
        </div>
    );
  };
  
  export default Scrollbar;