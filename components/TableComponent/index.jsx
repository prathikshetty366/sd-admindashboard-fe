import React from "react";
import styles from "./tablecomponent.module.scss";

const TableComponent = ({ data }) => {
  return (
    <>
      <div className={styles.container}>
        <table className={styles.tablestyle}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Reg no</th>
              <th>Status</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.regno}</td>
                <td>
                  <span className={styles.bookstatus}>{item.bookstatus}</span>
                </td>
                <td>{item.created}</td>

                <td>
                  <button className={styles.viewMoreButton}>View More</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableComponent;
