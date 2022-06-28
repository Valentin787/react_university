import PropTypes from "prop-types";
import { memo } from "react";
import { useContext } from "react";
import { ThemeContext, themes } from "../../../components/context/themeContext";

import CardWithMenu from "../../CardWithMenu/CardWithMenu";
import Paper from "../../common/Paper/Paper";
import s from "../CitiesBlock.module.css";

const CitiesList = ({
  cities,
  onDeleteCity,
  onModalCityOpen,
  onOpenEditCityModal,
  onEditModalOpen,
}) => {
  //USE_CONTEXT
  const { theme } = useContext(ThemeContext);

  return (
    <ul className={s.list}>
      {cities.map((item) => (
        <li
          className={theme === themes.light ? s.itemLight : s.itemDark}
          key={item.id}
        >
          <Paper>
            <CardWithMenu
              text={item.name}
              onDeleteModal={() => onDeleteCity(item)}
              onModalCityOpen={onModalCityOpen}
              onOpenEditModal={() => onOpenEditCityModal(item)}
              onEditModalOpen={onEditModalOpen}
            />
          </Paper>
        </li>
      ))}
    </ul>
  );
};
CitiesList.propTypes = {
  cities: PropTypes.array,
  onDeleteCity: PropTypes.func,
  onModalCityOpen: PropTypes.string,
  onOpenEditCityModal: PropTypes.func,
};

export default memo(CitiesList);

// class CitiesList extends Component {
//   render() {
//     const {
//       cities,
//       onDeleteCity,
//       onModalCityOpen,
//       onOpenEditCityModal,
//       onEditModalOpen,
//     } = this.props;

//     return (
//       <ul className={s.list}>
//         {cities.map((item) => (
//           <li className={s.item__list} key={item.id}>
//             <Paper>
//               <CardWithMenu
//                 text={item.name}
//                 onDeleteModal={() => onDeleteCity(item)}
//                 onModalCityOpen={onModalCityOpen}
//                 onOpenEditModal={() => onOpenEditCityModal(item)}
//                 onEditModalOpen={onEditModalOpen}
//               />
//             </Paper>
//           </li>
//         ))}
//       </ul>
//     );
//   }
// }

// CitiesList.propTypes = {
//   cities: PropTypes.array,
//   onDeleteCity: PropTypes.func,
//   onModalCityOpen: PropTypes.string,
//   onOpenEditCityModal: PropTypes.func,
// };

// export default CitiesList;
