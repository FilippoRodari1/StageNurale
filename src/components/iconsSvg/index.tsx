import Home from "./home";
import Clienti from "./clienti";
import Fornitori from "./fornitori";
import Risorse from "./risorse";
import Skills from "./skills";
import TipoDiPagamento from "./tipoDiPagamento";
import Impostazioni from "./impostazioni";
import Logout from "./logout";
import Occhio from "./occhio";
import Modifica from "./modifica";
import Delete from "./delete";
import TickTrue from "./tickTrue";
import XDelete from "./xDelete";
import User from "./user";
import Campanello from "./campanello";
import Timesheet from "./timesheet";


interface Props {
  name: "home" | "clienti" | "fornitori" | "risorse" | "skills" | "tipoDiPagamento" | "impostazioni" | "logout" | "occhio" | "modifica" | "delete" | "tickTrue" | "xDelete" | "user" | "campanello" | "timesheet";
  color?: string;
  width?: number;
  height?: number;
  className? : string
}

const IconSvg = ({ name, color, width, height }: Props) => {
  const icons = {
    home: Home,
    clienti: Clienti,
    fornitori: Fornitori,
    risorse: Risorse,
    skills: Skills,
    tipoDiPagamento: TipoDiPagamento,
    impostazioni: Impostazioni,
    logout: Logout,
    occhio: Occhio,
    modifica: Modifica,
    delete: Delete,
    tickTrue : TickTrue,
    xDelete : XDelete,
    user : User,
    campanello : Campanello,
    timesheet : Timesheet
  };

  const IconComponent = icons[name];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent color={color} width={width} height={height} />;
};

export default IconSvg;
