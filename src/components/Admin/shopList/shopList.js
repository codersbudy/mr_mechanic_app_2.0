import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../WebApi/api";
import axios from 'axios';
import './shopList.css';

function ShopList() {
  const [shopList, setShopList] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  var navigate = useNavigate();


  var rating = (r) => {
    let count = <></>;
    for (let i = 0; i < Math.trunc(r); i++)
      count = <>{count}<li><i className="text-warning fa fa-star" /></li></>
    if (((r / 0.5) % 2))
      count = <>{count}<li><i className="text-warning fa fa-star-half" /></li></>
    return count;
  }

  const updateStatus = (id, shopStatus) => {

    if (shopStatus == 'accept')
      shopStatus = 'Deactive'
    else
      shopStatus = 'accept'
    // alert(id + "" + shopStatus);
    let response = axios.post(api.UPDATE_SHOP_STATUS, { shopStatus: shopStatus, _id: id });
    console.log(response);

  }

  useEffect(() => {
    let response = axios.get(api.ALL_SHOP);
    response.then((result) => {
      console.log(result);
      setShopList(result.data.result);
      setIsLoading(false);
    }).catch((err) => {
      console.log(err)
    });
  }, []);

  const description = (shop) => {
    console.log(shop);

    navigate("/viewShopDetails", {
      state: {
        shop: shop
      }
    });
  }
  return <>
    <div className="main-dashboard ">
      <div className="row root-n offset-1">
        {!isLoading &&
          shopList.map((shop, index) => <div className="col-3">
            <div className="card-container">
              <a onClick={() => description(shop)} className="hero-image-container anchor">
                <img className="hero-image" src={shop.photo} alt="Image" />
              </a>
              {/* <hr className="mb-1" /> */}
              <div className="row rat">
                <div className="col-4 ">
                  <div className="rat-div-m">
                    <ul className="list-unstyled d-flex justify-content-between ratings-m">

                      {/* <i className="text-warning fa fa-star" /> */}
                      {/* {rating(shop.rating)} */}

                      <li>
                        <i className="text-warning fa fa-star" />
                      </li>
                      <li>
                        <i className="text-warning fa fa-star" />
                      </li>
                      <li>
                        <i className="text-warning fa fa-star" />
                      </li>
                    </ul>
                    {/* <h2 className='h2-n'>{shop.rating}</h2> */}
                  </div>
                </div>
                <div className="col-8 pl-4 mt-1">
                  <div className="row">
                    <div className="col-5">
                      {shop.shopStatus == "Deactive" && <button onClick={() => updateStatus(shop._id, shop.shopStatus)} class="btnAdmin">
                        <span>
                          Active
                        </span>
                        <span>Sure ?</span>
                        <span>
                          Done !
                        </span>
                      </button>}
                      {shop.shopStatus == "accept" && <button onClick={() => updateStatus(shop._id, shop.shopStatus)} disabled class="btnAdmin">
                        <span>
                          Active
                        </span>
                        <span>Sure ?</span>
                        <span>
                          Done !
                        </span>
                      </button>}
                    </div>
                    <div className="col-5 pl-1">
                      {shop.shopStatus == "Deactive" && <button onClick={() => updateStatus(shop._id, shop.shopStatus)} disabled class="btnAdmin bg-nm">
                        <span>
                          Deactive
                        </span>
                        <span className="bg-nm">Sure ?</span>
                        <span className="bg-success">
                          Done !
                        </span>
                      </button>}
                      {shop.shopStatus == "accept" && <button onClick={() => updateStatus(shop._id, shop.shopStatus)} class="btnAdmin bg-nm">
                        <span>
                          Deactive
                        </span>
                        <span className="bg-nm">Sure ?</span>
                        <span className="bg-success">
                          Done !
                        </span>
                      </button>}

                    </div>
                  </div>
                </div>
              </div>
              <main className="main-content">
                <h1 className="h1-n">
                  <a className="anchor" href="#">
                    {shop.shopName}
                  </a>
                </h1>
                <p className="p-n">{shop.address.slice(0, 50)}</p>

              </main>
            </div>
          </div>)}
        {isLoading && <>
          <center>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              style={{ margin: "auto", background: "#fff", display: "block" }}
              width="200px"
              height="200px"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid"
            >
              <g transform="translate(50 50)">
                {" "}
                <g transform="translate(-19 -19) scale(0.6)">
                  {" "}
                  <g>
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values="0;45"
                      keyTimes="0;1"
                      dur="0.34843205574912894s"
                      begin="0s"
                      repeatCount="indefinite"
                    />
                    <path
                      d="M31.35997276079435 21.46047782418268 L38.431040572659825 28.531545636048154 L28.531545636048154 38.431040572659825 L21.46047782418268 31.359972760794346 A38 38 0 0 1 7.0000000000000036 37.3496987939662 L7.0000000000000036 37.3496987939662 L7.000000000000004 47.3496987939662 L-6.999999999999999 47.3496987939662 L-7 37.3496987939662 A38 38 0 0 1 -21.46047782418268 31.35997276079435 L-21.46047782418268 31.35997276079435 L-28.531545636048154 38.431040572659825 L-38.43104057265982 28.531545636048158 L-31.359972760794346 21.460477824182682 A38 38 0 0 1 -37.3496987939662 7.000000000000007 L-37.3496987939662 7.000000000000007 L-47.3496987939662 7.000000000000008 L-47.3496987939662 -6.9999999999999964 L-37.3496987939662 -6.999999999999997 A38 38 0 0 1 -31.35997276079435 -21.460477824182675 L-31.35997276079435 -21.460477824182675 L-38.431040572659825 -28.531545636048147 L-28.53154563604818 -38.4310405726598 L-21.4604778241827 -31.35997276079433 A38 38 0 0 1 -6.999999999999992 -37.3496987939662 L-6.999999999999992 -37.3496987939662 L-6.999999999999994 -47.3496987939662 L6.999999999999977 -47.3496987939662 L6.999999999999979 -37.3496987939662 A38 38 0 0 1 21.460477824182686 -31.359972760794342 L21.460477824182686 -31.359972760794342 L28.531545636048158 -38.43104057265982 L38.4310405726598 -28.53154563604818 L31.35997276079433 -21.4604778241827 A38 38 0 0 1 37.3496987939662 -6.999999999999995 L37.3496987939662 -6.999999999999995 L47.3496987939662 -6.999999999999997 L47.349698793966205 6.999999999999973 L37.349698793966205 6.999999999999976 A38 38 0 0 1 31.359972760794346 21.460477824182682 M0 -23A23 23 0 1 0 0 23 A23 23 0 1 0 0 -23"
                      fill="#080808"
                    />
                  </g>
                </g>{" "}
                <g transform="translate(19 19) scale(0.6)">
                  {" "}
                  <g>
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values="45;0"
                      keyTimes="0;1"
                      dur="0.34843205574912894s"
                      begin="-0.17421602787456447s"
                      repeatCount="indefinite"
                    />
                    <path
                      d="M-31.35997276079435 -21.460477824182675 L-38.431040572659825 -28.531545636048147 L-28.53154563604818 -38.4310405726598 L-21.4604778241827 -31.35997276079433 A38 38 0 0 1 -6.999999999999992 -37.3496987939662 L-6.999999999999992 -37.3496987939662 L-6.999999999999994 -47.3496987939662 L6.999999999999977 -47.3496987939662 L6.999999999999979 -37.3496987939662 A38 38 0 0 1 21.460477824182686 -31.359972760794342 L21.460477824182686 -31.359972760794342 L28.531545636048158 -38.43104057265982 L38.4310405726598 -28.53154563604818 L31.35997276079433 -21.4604778241827 A38 38 0 0 1 37.3496987939662 -6.999999999999995 L37.3496987939662 -6.999999999999995 L47.3496987939662 -6.999999999999997 L47.349698793966205 6.999999999999973 L37.349698793966205 6.999999999999976 A38 38 0 0 1 31.359972760794346 21.460477824182682 L31.359972760794346 21.460477824182682 L38.431040572659825 28.531545636048154 L28.531545636048183 38.4310405726598 L21.460477824182703 31.35997276079433 A38 38 0 0 1 6.9999999999999964 37.3496987939662 L6.9999999999999964 37.3496987939662 L6.999999999999995 47.3496987939662 L-7.000000000000009 47.3496987939662 L-7.000000000000007 37.3496987939662 A38 38 0 0 1 -21.46047782418263 31.359972760794385 L-21.46047782418263 31.359972760794385 L-28.531545636048094 38.43104057265987 L-38.431040572659796 28.531545636048186 L-31.359972760794328 21.460477824182703 A38 38 0 0 1 -37.34969879396619 7.000000000000032 L-37.34969879396619 7.000000000000032 L-47.34969879396619 7.0000000000000355 L-47.3496987939662 -7.000000000000002 L-37.3496987939662 -7.000000000000005 A38 38 0 0 1 -31.359972760794346 -21.460477824182682 M0 -23A23 23 0 1 0 0 23 A23 23 0 1 0 0 -23"
                      fill="#3cb0a2"
                    />
                  </g>
                </g>
              </g>
            </svg>
          </center>
        </>
        }
      </div>
    </div>
  </>
}
export default ShopList;