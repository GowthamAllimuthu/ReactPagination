import { useEffect,useState } from "react";
import {Container, Table} from "react-bootstrap";
import ReactPaginate from "react-paginate";
import axios from 'axios';
import './App.css';
function Pagination() {
  const [Paginationvalues, PaginationDatas] = useState([]);
  useEffect(() => {
    axios.get('https://api.punkapi.com/v2/beers?page=1&per_page=10')
    .then(function (res) {
      console.log(res);
      PaginationDatas(res.data);
    })
},[])
const handlePageClick = (event) => {
  axios.get(`https://api.punkapi.com/v2/beers?page=${event.selected}&per_page=10`)
  .then(function (res) {
    PaginationDatas(res.data);
  })
  }
  const details = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
       title: 'Name',
       dataIndex: 'name',
    },
    {
       title:"Tagline",
       dataIndex: 'tagline',
    },
    {
        title: " First_brewed",
        dataIndex: 'first_brewed',
    },
    {
       title: "Description",
       dataIndex:'description',
    }
  ]
  return (  
      <div className = "APP">
        <div className="container">
          <Container>
            <Table className="table table-striped table-dark">
            <thead>
          <tr>
          {details && details.map((item) => {
           console.log("item",item.title)
            return (
              <th>{item.title}</th>
            )
          })} 
          </tr>
        </thead>
        <tbody>
          {Paginationvalues && Paginationvalues.map((field) => {
                  return(
                <tr>
                    <td>{field.id}</td>
                    <td>{field.name}</td>
                    <td>{field.tagline}</td>
                    <td>{field.first_brewed}</td>
                    <td>{field.description}</td>
                    </tr>
                  )
                })}
        </tbody>
      </Table>
    </Container>
    <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        pageCount={10}
        marginPagesDisplayed={5}
        pageRangeDisplayed={10}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-link'}
        nextClassName={'page-link'}
        />
      </div>
</div>
  )   
}
export default Pagination;
