import React from "react";
import FormNavbar from "./FormNavbar";
import { Container, Row, Col, Form, Table } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "../style.css";
import { useStyles } from "../style1";
import { useState } from "react";
import { useEffect } from "react";
import {
    getuserMineFields,
    StripsDatatoDB,
    Type_StriptoDB,
} from "../services/save/index";
import { getStrips_data, getTypes_of_strip } from "../services/retrieve/index";
import { useHistory } from "react-router-dom";
export const Showmines = () => {
    const loc = useLocation();
    // console.log(loc,"samm");
    let user_id = loc.state.user_id;
    let mineid1 = loc.state.mine_id;
    let strip_id = loc.state.strip_id;
    const classes = useStyles();
    const [mine, setMine] = useState([]);
    const [mlp, setMlp] = useState();
    const [lay, setLay] = useState();
    const [total, setTotal] = useState();
    const [strips, setStrips] = useState();
    const [types_strip, setTypes_strip] = useState([]);
    const [check, setCheck] = useState([]);
    let strips_id;
    const history = useHistory();
    // console.log(check);
    // const [checkedState, setCheckedState] = useState(
    //   new Array(check.length).fill(false)
    // );
    // console.log("checked", checkedState);
    // const handleOnChange1 = (position) => {
    //   console.log("position",position);
    //   const updatedCheckedState = checkedState.map((item, index) =>
    //     index === position ? !item : item
    //   );
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let arr1 = ["A_P", "A_T", "Frag", "Infl"];
    useEffect(() => {
        getuserMineFields(mineid1)
            .then((res) => {
                if (res.status === 200) {
                    setMine(res.data[0]);
                    setTotal(res.data[0].total_no_of_mines);
                    setStrips(res.data[0].strips_id);
                }
            })
            .catch((e) => {
                console.log("error", e.message);
            });
    }, []);
    useEffect(() => {
        getTypes_of_strip(strip_id)
            .then((res) => {
                // console.log(res[0]);
                setTypes_strip(
                    res[0]
                        ? res[0]
                        : {
                            Mixed_with_frag: 0,
                            Pure_A_p: 0,
                            Pure_A_T: 0,
                            Mixed: 0,
                            A_T_with_Frag: 0,
                            A_P_with_Frag: 0,
                            Rate_of_Lying: lay,
                            MLPs_required: mlp,
                        }
                );
            })
            .catch((e) => {
                console.log("error", e.message);
            });
        // get strips table data

        getStrips_data(user_id)
            .then((res) => {
                console.log("strips data", res);
                let n = 0;
                let n1 = 0;
                let n2 = 0;
                let n3 = 0;
                res.map((e) => {
                    console.log(e.A_P);
                    n = 10 * (e.A_P ? 0 : 0) + e.strips;
                    // n1 = 10 * (e.A_T ? 1 : 1) + e.strips;
                    // n2 = 10 * (e.Frag ? 2 : 2) + e.strips;
                    // n3 = 10 * (e.Infl ? 3 : 3) + e.strips;

                    //  console.log(e.A_P);
                    // let n1=10*e.strips+e.A_T
                    // let n2=10*e.strips+e.Frag
                    // let n3=10*e.strips+e.Infl
                    console.log(n, "n");
                    // console.log(n1, "n1");
                    // console.log(n2, "n2");
                    // console.log(n3, "n3");
                    n = 0;
                    n1 = 0;
                    n2 = 0;
                    n3 = 0;
                });

                setCheck(res);
            })
            .catch((e) => {
                console.log("error", e.message);
            });
    }, [strip_id]);
    strips_id = mine.strips_id;
    // console.log("check",check);
    const rate = (e) => {
        const { value } = e.target;
        setLay(value);
    };
    let no_mlp = Math.ceil(total / lay);
    useEffect(() => {
        setMlp(no_mlp);
    }, [lay]);
    const [array, setArray] = useState([
        [true, 0, 0, 0],
        [0, true, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ]);
    // let array = [
    //   [0, 0, 0, 0],
    //   [0, 0, 0, 0],
    //   [0, 0, 0, 0],
    //   [0, 0, 0, 0],
    //   [0, 0, 0, 0],
    //   [0, 0, 0, 0],
    //   [0, 0, 0, 0],
    //   [0, 0, 0, 0],
    //   [0, 0, 0, 0],
    //   [0, 0, 0, 0],
    // ];

    const handleChange = (e) => {
        // e.preventDefault();
        const { name, checked } = e.target;
        console.log(checked);
        let num = name;
        let col = Math.floor(num / 10);
        let row = num % 10;
        if (array[row][col] == true) {

        }
        if (checked)
            array[row][col] = 1;
        else {
            array[row][col] = 0
        }
        // console.log("array",array);
    };

    let mixed = 0;
    let Atk = 0;
    let Ap = 0;
    let Atk_frag = 0;
    let Ap_frag = 0;
    let mixed_frag = 0;

    // const updatedCheckedState = checkedState.map((item, index) =>
    //     index === position ? !item : item
    //   );
    const Onsubmit = async (array) => {
        // console.log("array", array);
        let obj;
        let mine = mineid1;
        // console.log(mine);
        let k = 0;
        for (let i = 0; i < 10; i++) {
            let j = 0;
            // console.log(array[i][j]);
            obj = {
                strips: k++,
                A_P: array[i][j++],
                A_T: array[i][j++],
                Frag: array[i][j++],
                Infl: array[i][j++],
                mine_id: mine++,
                user_id: user_id,
            };
            console.log("obj", obj);
            await StripsDatatoDB(obj)
                .then((res) => {
                    // console.log(res);
                    // console.log(res.strips);
                    if (res.A_P && res.A_T && res.Frag) {
                        // console.log(res.A_P,res.A_T,res.Frag);
                        mixed_frag++;
                    }
                    if (res.A_T && res.Frag && !res.Infl && !res.A_P) {
                        // console.log(res.A_T);
                        Atk_frag++;
                    }
                    if (res.A_P && res.Frag && !res.Infl && !res.A_T) {
                        // console.log(res.A_P);
                        Ap_frag++;
                    }
                    if (res.A_P && res.A_T && !res.Frag && !res.Infl) {
                        // console.log(res.A_P,res.A_T);
                        mixed++;
                    }
                    if (res.A_P && !res.A_T && !res.Frag && !res.Infl) {
                        // console.log(res.A_P);
                        Ap++;
                    }
                    if (res.A_T && !res.A_P && !res.Frag && !res.Infl) {
                        // console.log(res.A_T);
                        Atk++;
                    }
                    // console.log(mixed_frag, Atk_frag, Ap_frag, Atk, Ap, mixed);
                    //  console.log(res.strips);
                })
                .catch((e) => {
                    console.log(e.message, " fe err");
                });
        }

        let obj2 = {
            Mixed_with_frag: mixed_frag,
            Pure_A_p: Ap,
            Pure_A_T: Atk,
            Mixed: mixed,
            A_T_with_Frag: Atk_frag,
            A_P_with_Frag: Ap_frag,
            Rate_of_Lying: lay,
            MLPs_required: mlp,
            Strips_id: strips,
        };
        Type_StriptoDB(obj2)
            .then((res) => {
                console.log(res);
            })
            .catch((e) => {
                console.log(e.message);
            });
        history.push({
            pathname: "/show-access-info",
            state: { strip_id: strips_id, mine_id: mineid1, user_id: user_id },
        });
    };

    const goBack = () => {
        history.push({
            pathname: "/minefield_details",
            state: { strip_id: false, mine_id: mineid1 },
        });
    };
    return (
        <div>
            <Container>
                <FormNavbar />
                <Row className="mt-5">
                    <div style={{ height: "70px" }}>
                        <div className={classes.goHome}>
                            <Link to="/dash">← Home</Link>
                        </div>
                        <div className={classes.mainTitle}>
                            <h2 id="mainHeading" className={classes.mainTitleh}>
                                Strips and Mines
                            </h2>
                        </div>
                    </div>
                </Row>
                <Row className="mt-5">
                    <Col md="7" lg="6">
                        <Col>
                            {/* No. of Strips */}
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Mines</th>
                                        <th>Density</th>
                                        <th>Ratio</th>
                                        <th>No of Strips</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>A/PERS</td>
                                        <td>{mine.A_P}</td>
                                        <td>{mine.A_P}/1</td>
                                        <td>{mine.no_strip_ap}</td>
                                    </tr>
                                    <tr>
                                        <td>A/TK</td>
                                        <td>{mine.A_T}</td>
                                        <td>{mine.A_T}/(1/3)</td>
                                        <td>{mine.no_strip_atk}</td>
                                    </tr>
                                    <tr>
                                        <td>FRAG</td>
                                        <td>{mine.FRAG}</td>
                                        <td>{mine.FRAG}/(1/12)</td>
                                        <td>{mine.no_frag}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Row className="mb-3">
                                <Col md="5" lg="4">
                                    <Form className={classes.showMineform}>
                                        <Form.Group as={Row}>
                                            <Col>
                                                <Form.Label>Max Strips</Form.Label>
                                            </Col>
                                            <Col>{mine.max_Strips}</Col>
                                        </Form.Group>
                                    </Form>
                                </Col>
                                <Col md="5" lg="5">
                                    <Form className={classes.showMineform}>
                                        <Form.Group as={Row}>
                                            <Col>
                                                <Form.Label>Min Strips</Form.Label>
                                            </Col>
                                            <Col>{mine.min_strips}</Col>
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>

                            {/* Types of strips */}
                            <Table striped bordered className="mb-3" lg="5" md="2">
                                <thead>
                                    <tr>
                                        <th>Mines</th>
                                        <th>A</th>
                                        <th>B</th>
                                        <th>C</th>
                                        <th>D</th>
                                        <th>E</th>
                                        <th>F</th>
                                        <th>G</th>
                                        <th>H</th>
                                        <th>I</th>
                                        <th>J</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {arr1.map((e, i) => {
                                        let f = i;
                                        return (
                                            <tr>
                                                <td>{e}</td>
                                                {arr.map((e, i) => {
                                                    let num =
                                                        f == 0
                                                            ? f + i
                                                            : f == 1
                                                                ? 10 + i
                                                                : f == 2
                                                                    ? 20 + i
                                                                    : f == 3
                                                                        ? 30 + i
                                                                        : 0;
                                                    return 
                                                        <td>
                                                            <input
                                                                type="checkbox"
                                                                name={num}
                                                                onChange={(e) => {
                                                                    handleChange(e);
                                                                }}
                                                            />
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>

                            <Row>
                                <Col className={classes.endButtons}>
                                    <button onClick={() => goBack()} className={classes.endBack}>
                                        Back
                                    </button>
                                    <button
                                        onClick={() => Onsubmit(array, mineid1)}
                                        className={classes.endFinish}
                                    >
                                        Next
                                    </button>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    );
  };