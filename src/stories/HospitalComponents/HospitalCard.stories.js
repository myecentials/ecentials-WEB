import HospitalCard from "../../components/Hospital/HospitalCard";
import person from "../../assets/images/svgs/hospital/person.svg";
import "bootstrap/dist/css/bootstrap.css";
import "../../assets/styles/hospital.css";
export default {
  title: "Example/Hospital Card",
  components: HospitalCard,
};

export const Card = {
  render: () => <HospitalCard />,
};
