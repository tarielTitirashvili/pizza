import React from 'react';
import ContentLoader from 'react-content-loader';

type Props = {};

const Skeleton = (props: Props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={531}
    viewBox="0 0 280 531"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="144" cy="129" r="120" />
    <rect x="0" y="261" rx="12" ry="12" width="280" height="27" />
    <rect x="1" y="307" rx="11" ry="11" width="280" height="88" />
    <rect x="5" y="410" rx="6" ry="6" width="95" height="27" />
    <rect x="131" y="401" rx="28" ry="28" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
