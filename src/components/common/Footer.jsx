import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">关于我们</h3>
            <p className="text-gray-300">
              医疗需求与创新平台致力于连接临床需求与创新解决方案，推动医疗技术进步。
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/needs" className="text-gray-300 hover:text-white">临床需求</Link>
              </li>
              <li>
                <Link to="/innovations" className="text-gray-300 hover:text-white">创新方案</Link>
              </li>
              <li>
                <Link to="/voting" className="text-gray-300 hover:text-white">评选投票</Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-300 hover:text-white">活动</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">联系我们</h3>
            <p className="text-gray-300">邮箱: support@medinnovate.com</p>
            <p className="text-gray-300">电话: +86 123-456-7890</p>
            <p className="text-gray-300">地址: 中国上海创新路123号</p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} 医疗需求与创新平台. 保留所有权利.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
