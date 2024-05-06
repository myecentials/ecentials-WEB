import React, { useState, useEffect } from "react";
import { FaDotCircle } from "react-icons/fa";
import { useFetchInventoryMutation } from '../../app/features/report/reportApiSlice';
import { facility_id } from '../../app/features/authSlice/authSlice';
import { useSelector } from "react-redux";
import { Modal, ModalBody,Button } from "reactstrap";


const MyLegend = ({ colors }) => {
  const [inventory, setInventory] = useState([]);
  const [fetchInventory] = useFetchInventoryMutation();
  const facilityId = useSelector(facility_id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchInventory(facilityId);
        setInventory(result?.data?.data?.drugs);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [facilityId, fetchInventory]);

  const drugs = [...new Set(inventory?.map(item => item.medicine_group || 'Empty'))];

  //console.log(drugs)
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <><div className="revenue-pie">
      {drugs.slice(0, 4).map((drug, index) => (
        <li key={index} className="d-flex">
          <FaDotCircle style={{ color: colors[index % colors.length] }} />
          <span className="mx-2">{drug}</span>
        </li>
      ))}

      {drugs.length > 4 && (
        <span  style={{ fontSize: '9px', cursor: "pointer" }} onClick={toggleModal}>Show More</span>
      )}
    </div>
    <Modal isOpen={isModalOpen} centered={true}>
        <ModalBody>
          <div onClick={()=> setIsModalOpen(false) } className="d-flex text justify-content-end">
          <Button className="close" aria-label="Close" onClick={toggleModal} >
          <span aria-hidden="true">&times;</span>
        </Button>
          </div>
          <div className="d-grid">
        {drugs.slice(0, drugs?.length).map((drug, index) => (
        <li key={index} className="d-flex">
          <FaDotCircle style={{ color: colors[index % colors.length] }} />
          <span className="mx-2">{drug}</span>
        </li>
      ))}
          </div>
        </ModalBody>
      </Modal></>
  );
};

export default MyLegend;
