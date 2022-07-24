import React from "react";
import Svg, { G, Path, Defs, Mask, Rect } from "react-native-svg";

const BgImage = (props) => {
  return (
    <Svg
      width="1125"
      height="2436"
      preserveAspectRatio="none"
      viewBox="0 0 1125 2436"
      {...props}
    >
      <G mask='url("#SvgjsMask1036")' fill="none">
        <Rect
          width="1125"
          height="2436"
          x="0"
          y="0"
          fill="rgba(214, 223, 228, 1)"
        ></Rect>
        <Path
          d="M0,893.909C177.395,942.304,378,927.883,537.369,836.162C699.469,742.869,797.675,569.592,866.013,395.495C931.885,227.68,940.444,46.9,917.358,-131.896C894.009,-312.732,877.528,-524.002,732.946,-635.101C588.724,-745.923,377.17,-639.623,200.476,-682.759C36.075,-722.894,-89.272,-895.463,-257.479,-876.894C-429.914,-857.859,-561.949,-716.477,-676.253,-585.976C-791.01,-454.957,-891.914,-304.098,-910.832,-130.958C-929.467,39.596,-881.551,218.164,-779.158,355.829C-685.011,482.408,-506.858,497.058,-377.051,586.702C-240.894,680.731,-159.636,850.359,0,893.909"
          fill="#c9d5db"
        ></Path>
        <Path
          d="M1125 3260.849C1314.939 3296.756 1510.7350000000001 3387.013 1690.489 3315.918 1878.644 3241.5 2051.301 3076.041 2092.907 2878.0280000000002 2133.928 2682.799 1965.3600000000001 2512.794 1898.751 2324.751 1847.262 2179.392 1846.025 2015.272 1745.79 1898.083 1645.258 1780.547 1491.846 1734.127 1347.057 1679.745 1191.262 1621.229 1036.938 1570.954 870.524 1569.336 653.288 1567.2240000000002 389.283 1511.328 239.80899999999997 1668.978 91.42499999999995 1825.478 177.22000000000003 2084.169 177.91600000000005 2299.83 178.51199999999994 2484.464 147.35000000000002 2680.957 243.58299999999997 2838.5299999999997 336.48199999999997 2990.645 521.289 3048.257 682.03 3125.274 824.1669999999999 3193.377 970.133 3231.572 1125 3260.849"
          fill="#e3e9ed"
        ></Path>
      </G>
      <Defs>
        <Mask id="SvgjsMask1036">
          <Rect width="1125" height="2436" fill="#ffffff"></Rect>
        </Mask>
      </Defs>
    </Svg>
  );
};

export default BgImage;
