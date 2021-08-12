import React, { useState, useEffect, useRef } from "react";
import "antd/dist/antd.css";
import "./components/mobile.css";
import { Button } from "antd";
import { LeftOutlined, MobileOutlined, PlusOutlined } from "@ant-design/icons";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getNames } from "./util/index.js";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import { Input } from "antd";
import beside_search_pic from "./components/img/beside_search_pic.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    paddingLeft: 35,
    fontSize:20,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "70%",
  },
}));

// change
const Mobile = () => {

  // xchange
  useEffect(() => {
    sessionStorage.clear();
  },[])

  const { Search } = Input;

  const backHome = () => {
    window.location = "/";
  };

  const [width, setWidth] = useState(window.innerWidth);
  const handleWindowSizeChange = () => {
          setWidth(window.innerWidth);
      }
  useEffect(() => {
          window.addEventListener('resize', handleWindowSizeChange);
          return () => {
              window.removeEventListener('resize', handleWindowSizeChange);
          }
      }, []);

  let isMobile = (width <= 768);



  const defId1 = window.sessionStorage.getItem("bachat_phone_1_id")
    ? window.sessionStorage.getItem("bachat_phone_1_id")
    : 0;
  const defId2 = window.sessionStorage.getItem("bachat_phone_2_id")
    ? window.sessionStorage.getItem("bachat_phone_2_id")
    : 0;

    console.log("defId1 "+defId1)
  const [options, setMyOptions] = React.useState([]);
  const [value1, setValue1] = React.useState();
  const [inputValue1, setInputValue1] = React.useState("");
  const [customValue1, setCustomValue1] = React.useState(defId1);
  const [value2, setValue2] = React.useState();
  const [inputValue2, setInputValue2] = React.useState("");
  const [customValue2, setCustomValue2] = React.useState(defId2);
  const [searchfirst, setSearchfirst] = useState("");
  const [searchsecond, setSearchsecond] = useState("");
  const firstUpdate = useRef(true);
  window.sessionStorage.setItem("bachat_category", "mobile");
 

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    // window.sessionStorage.setItem("bachat_phone_2_id", customValue2);
    window.sessionStorage.setItem("bachat_phone_1_id", customValue1);
    submitSearchFirst()
  }, [customValue1, customValue2]);

  const getDataFromAPI = async (val, id) => {
    /*change*/
    const category = "mobile";
    const res = await getNames(val, category);
    options.length = 0;
    setMyOptions(res);
    if (id === 1) setValue1(res[0]);
    else setValue2(res[0]);
  };

  const handleSearchFirst = (data) => {
    let val = data;
    if (val !== "") {
      getDataFromAPI(val, 1);
    }
    setSearchfirst(val);
  };

  const handleSearchSecond = (data) => {
    let val = data;
    if (val !== "") {
      getDataFromAPI(val, 2);
    }
    setSearchsecond(val);
  };

  const submitSearchFirst = () => {
    console.log("submitSearchFirst");
    console.log("searchfirst "+searchfirst)
    console.log("customValue1 "+customValue1)
    // newarrival
    window.sessionStorage.setItem("byurl",0);

    if (searchfirst) {
      window.sessionStorage.setItem("bachat_phone_1", searchfirst);
      window.sessionStorage.setItem("bachat_search_phone", customValue1);
      // xchange
      window.sessionStorage.setItem("secondProductScreen",0);

      /*change*/
      window.location = `/search/mobile/product`;
    }
  };

  // newarrival

  const submitNewSearchFirst = () => {
    console.log("submitNewSearchFirst");
    console.log("searchfirst "+searchfirst)
    console.log("customValue1 "+customValue1)

    if (searchfirst) {
      //sessionStorage.clear();

      window.sessionStorage.setItem("prd_name", searchfirst);
      window.sessionStorage.setItem("bachat_category", 'mobile');

      // window.sessionStorage.setItem("bachat_search_phone", customValue1);
        /*change*/
      window.location = `/search/new-arrival-product`;
    }
  };

  const submitSearchSecond = () => {
    if (searchsecond) {
      /*newarrival*/
      sessionStorage.setItem("byurl",0);
      window.sessionStorage.setItem("bachat_phone_2", searchsecond);
      window.sessionStorage.setItem("bachat_search_phone", customValue2);
        /*change*/
      window.location = `/search/mobile/product`;
    }
  };

  const submitData = () => {
    if (searchfirst && searchsecond) {
      console.log(searchfirst + " both " + searchsecond);
      window.sessionStorage.setItem("bachat_phone_1", searchfirst);
      window.sessionStorage.setItem("bachat_phone_2", searchsecond);
      window.location = `/search/compare`;
    } else if (searchfirst) {
      console.log(searchfirst + " only 1");
      window.sessionStorage.setItem("bachat_phone_search", searchfirst);
      /*change*/
      window.location = `/search/mobile/product`;
    } else if (searchsecond) {
      console.log(searchsecond + " only 2");
      window.sessionStorage.setItem("bachat_phone_search", searchsecond);
      /*change*/
      window.location = `/search/mobile/product/}`;
    }
  };

  const classes = useStyles();

  const deviceLogoN = (
  <>
    <div className="mlogo">
      <img src={beside_search_pic} />
     
    </div>
   </>

  )
  
  const deviceLogoY = (
    <>
      <div className="device_logo onlyweb" style={{ height: "inherit", width: "50%" }}>
      <div
        className="choose_psp"
        style={{
          height: "384px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2.5rem 1rem",
        }}
      >
        <div
          className="contentsp"
          style={{
            width: "200px",
            height: "200px",
            backgroundColor: "#FFE108",
            borderRadius: "18px",
            boxShadow: "5px 5px 50px 0px rgba(0,0,0,0.25)",
          }}
        >
          {/* change */}
          <MobileOutlined className="deviceiconsp" style={{ fontSize: "8.25rem", color: "#000" }} />
        </div>
        <h4 className="mobiletag">Mobile</h4>
      </div>
     
      </div>
      </>
  
    )

  return (
    <div className="mobile" style={{ height: "650px", background: "white" }}>
      <Button
        onClick={backHome}
        className="btn_abs onlyweb"
        style={{ height: "45px!important" }}
      >
        <LeftOutlined style={{ color: "#CAC8C8", fontSize: "1rem" }} />
      </Button>
      <div className="onlmobile">
      <MobileOutlined className="mobileImg onlymobile" />

      </div>
      <div className="compare_device">
        <div
          className="search_device"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <Search id={1} state={"prod"} width={50}/> */}
          <div className="searchbar1new">
          {deviceLogoY}
            <Autocomplete
              noOptionsText=""
              options={options}
              value={value1}
              getOptionLabel={(option) => option.name}
              renderOption={(option) => (
                <>
                  {/* {option.name} */}
                   <p onClick={submitSearchFirst}>{option.name}</p>
                </>
              )}
              onChange={(event, newValue) => {
                if (newValue !== null) {
                  setValue1(newValue);
                  setCustomValue1(newValue.ID);
                }
              }}
              inputValue={inputValue1}
              onInputChange={(event, newInputValue) => {
                handleSearchFirst(newInputValue);
                setInputValue1(newInputValue);
              }}
              renderInput={(params) => (
                <Paper
                  className={classes.root}
                  ref={params.ref}
                  style={isMobile?{
                    backgroundColor: "#fff",
                    borderRadius: 7,
                    width: '100%',
                    height: 40,
                    marginBottom: 25,
                  }:{
                    backgroundColor: "#fff",
                    borderRadius: 25,
                    width: 500,
                    marginBottom: 25,
                  }}
                >
                  {/* change */}
                  <TextField
                    {...params}
                    className={classes.input}
                    placeholder={"Search For Mobile Brand"}
                  />

                  {/* newarrival */}
                  <IconButton
                    onClick={submitNewSearchFirst}
                    className={classes.iconButton}
                    aria-label="search"
                  >
                    <SearchIcon className="searchicon" />
                  </IconButton>
                </Paper>
              )}
            />
          </div>
     
          <br />
{/* newarrival */}
          {/*<Search id={2} state={"prod"} width={500}/>*/}
          <div style={{'display':'none'}}>
            <Autocomplete
              noOptionsText=""
              options={options}
              value={value2}
              getOptionLabel={(option) => option.name}
              renderOption={(option) => (
                <>
                  {/* <p onClick={submitSearchSecond}>{option.name}</p> */}
                  {option.name}
                </>
              )}
              onChange={(event, newValue) => {
                if (newValue !== null) {
                  setValue2(newValue);
                  setCustomValue2(newValue.ID);
                }
              }}
              inputValue={inputValue2}
              onInputChange={(event, newInputValue) => {
                handleSearchSecond(newInputValue);
                setInputValue2(newInputValue);
              }}
              renderInput={(params) => (
                <Paper
                  className={classes.root}
                  ref={params.ref}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 25,
                    width: 500,
                    marginBottom: 25,
                  }}
                >
                  <TextField
                    {...params}
                    className={classes.input}
                    placeholder={"Search For Mobile Brand"}
                  />
                  <IconButton
                    onClick={submitSearchSecond}
                    className={classes.iconButton}
                    aria-label="search"
                  >
                    <SearchIcon className="searchicon" />
                  </IconButton>
                </Paper>
              )}
            />
          </div>

          <br />
          {/* newarrival */}
          <div
            className="btns_ft"
            style={{

              width: "100%",
              display: "none",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Button
            className="compareBtn"
              type="primary"
              shape="round"
              size="large"
              onClick={submitData}
            >
              Compare
            </Button>
            {/* <Button
              className="btn_ab"
              style={{ height: "45px!important", marginRight: "1rem" }}
            >
              <PlusOutlined style={{ color: "#CAC8C8", fontSize: "1rem" }} />
            </Button> */}
          </div>
        </div>
      </div>
      <div className="">{deviceLogoN}</div>
    </div>
  );
};

export default Mobile;
