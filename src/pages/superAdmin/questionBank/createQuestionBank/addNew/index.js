import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../module.createQuestionBank.css";
// import "../../../../../components/common/table/style.css"
import PulseLoader from "react-spinners/PulseLoader";
import validateField from "../../../../../utils/validateField";
import SelectInput from "../../../../../components/common/SelectInput";
import Input from "../../../../../components/common/input";

import {
    createQuestionBankFormApi,
    getStateListsApi,
} from "../../../../../api/authApi";

import { Button } from "@mui/material";
import {
    STATUS,
    QUESTION_TYPES,
    SECTOR,
} from "../../../../../config/constants/projectConstant";

import { ReactComponent as ArrowLeft } from "../../../../../assets/images/pages/subAdmin/arrow-left.svg";
import { ReactComponent as UploadIcon } from "../../../../../assets/icons/upload-cloud.svg";
import { ReactComponent as ListIcon } from "../../../../../assets/icons/list.svg";
import {
    SUPER_ADMIN_CREATE_QUESTION_BANK_PAGE,
    SUPER_ADMIN_QUESTION_ADD,
} from "../../../../../config/constants/routePathConstants";

const initialFormValues = {
    questionBankId: "",
    questionType: "",
    jobRole: "",
    jobLevel: "",
    code: "",
    sector: "",
    subSector: "",
    sectorCode: "",
    schemeName: "",
    schemeCode: "",
    nos: "",
    nosCode: "",
    theoryMarks: "",
    practicalMarks: "",
    status: "",
};

const CreateQuestionForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState(initialFormValues);
    const [errors, setErrors] = useState({});
    const [err, setErr] = useState("");
    const [focusedInput, setFocusedInput] = useState("");

    const changeHandler = (event) => {
        const { name, value, type, checked } = event.target;
        const fieldValue = type === "checkbox" ? checked : value;
        const fieldError = validateField(name, fieldValue);

        setFormValues({
            ...formValues,
            [name]: fieldValue,
        });
    };

    const focusHandler = (event) => {
        setFocusedInput(event.target.name);
    };

    const blurHandler = () => {
        setFocusedInput("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(formValues)
        navigate(SUPER_ADMIN_CREATE_QUESTION_BANK_PAGE);
        const formErrors = {};
        Object.keys(formValues).forEach((name) => {
            const value = formValues[name];
            const fieldError = validateField(name, value);
            // console.log(name, value)
            if (fieldError) {
                formErrors[name] = fieldError;
            }
        });
        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            setLoading(true);
            dispatch(
                createQuestionBankFormApi(
                    formValues,
                    navigate,
                    setLoading,
                    clearFormValues
                )
            );
        }
    };

    const clearFormValues = () => {
        navigate(SUPER_ADMIN_CREATE_QUESTION_BANK_PAGE);
        setFormValues(initialFormValues);
    };

    const handleSaveAndNext = () => {
        navigate(SUPER_ADMIN_QUESTION_ADD);
    };

    return (
        <div className="main-content">
            <div className="title">
                <div className="title_card" style={{ justifyContent: "flex-start" }}>
                    <ArrowLeft
                        onClick={() => navigate(SUPER_ADMIN_CREATE_QUESTION_BANK_PAGE)}
                        style={{ cursor: "pointer" }}
                    />
                    <h1>Create Question Bank Form</h1>
                </div>
                <div className="title_card" style={{ justifyContent: "flex-end" }}>
                    <Button
                        onClick={() => {
                            navigate("/");
                        }}
                        variant={"light-blue-btn"}
                        sx={{
                            width: "150px",
                            height: "42px",
                            textTransform: "unset",
                        }}
                        style={{ padding: "0px" }}
                    >
                        {<UploadIcon />}Upload NOS
                    </Button>
                    <Button
                        onClick={() => {
                            navigate(SUPER_ADMIN_CREATE_QUESTION_BANK_PAGE);
                        }}
                        variant={"light-blue-btn"}
                        sx={{
                            width: "150px",
                            height: "42px",
                            textTransform: "unset",
                            padding: "0px",
                        }}
                        style={{ padding: "0px" }}
                    >
                        {<ListIcon />}View List
                    </Button>

                    {/* <button>{<UploadIcon />}Upload NOS</button>
                    <button>{<ListIcon />}View List</button> */}
                </div>
            </div>

            <section className="sub-admin-wrapper">
                <div className="tab-content">
                    <div className="form-wrapper">
                        {err && (
                            <div className="error-box">
                                <p className="error-text">{err}</p>
                            </div>
                        )}
                        <div className="form">
                            {/* ============Form Starts here ========= */}
                            <form>
                                <div className="inputFeilds">
                                    <div className="form_title">
                                        <h1>Question Bank Form</h1>
                                    </div>
                                    <div className="duo_inputBox">
                                        <div className="form-group">
                                            <Input
                                                label="Question Bank ID"
                                                name="questionBankId"
                                                placeholder="Question Bank ID"
                                                onFocus={focusHandler}
                                                error={errors?.questionBankId}
                                                onBlur={blurHandler}
                                                onChange={changeHandler}
                                                value={formValues?.questionBankId}
                                                mandatory
                                            />
                                        </div>
                                        <div className="form-group">
                                            <div className="select_md">
                                                <SelectInput
                                                    name="questionType"
                                                    label="Question Type"
                                                    placeHolder="Select Question Type"
                                                    value={formValues?.questionType}
                                                    handleChange={changeHandler}
                                                    options={QUESTION_TYPES}
                                                    error={errors?.questionType}
                                                    mandatory
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="input_lg">
                                            <Input
                                                label="Job Role"
                                                type="text"
                                                name="jobRole"
                                                placeholder="Enter Job Role"
                                                onFocus={focusHandler}
                                                error={errors?.jobRole}
                                                onBlur={blurHandler}
                                                onChange={changeHandler}
                                                value={formValues?.jobRole}
                                                mandatory
                                            />
                                        </div>
                                    </div>

                                    <div className="duo_inputBox">
                                        <div className="form-group">
                                            <Input
                                                label="Job Level"
                                                type={"text"}
                                                name="jobLevel"
                                                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                                                placeholder="Enter Contact No."
                                                onFocus={focusHandler}
                                                error={errors?.jobLevel}
                                                onBlur={blurHandler}
                                                onChange={changeHandler}
                                                value={formValues?.jobLevel}
                                                mandatory
                                            />
                                        </div>
                                        <div className="form-group">
                                            <Input
                                                label="Code"
                                                type={"text"}
                                                name="code"
                                                placeholder="Enter the code"
                                                onFocus={focusHandler}
                                                error={errors?.code}
                                                onBlur={blurHandler}
                                                onChange={changeHandler}
                                                value={formValues?.code}
                                                mandatory
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="input_lg">
                                            <div className="input_select">
                                                <SelectInput
                                                    name="sector"
                                                    label="Sector"
                                                    placeHolder="Select Sector"
                                                    value={formValues?.sector}
                                                    handleChange={changeHandler}
                                                    options={SECTOR}
                                                    error={errors?.sector}
                                                    mandatory
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="duo_inputBox">
                                        <div className="form-group">
                                            <Input
                                                label="Subsector"
                                                type={"text"}
                                                name="subSector"
                                                placeholder="Enter your Subsector"
                                                onFocus={focusHandler}
                                                error={errors?.subSector}
                                                onBlur={blurHandler}
                                                onChange={changeHandler}
                                                value={formValues?.subSector}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <Input
                                                label="Sector Code"
                                                name="sectorCode"
                                                type={"number"}
                                                hideExponants={true}
                                                placeholder="Enter Sector Code"
                                                onFocus={focusHandler}
                                                error={errors?.sectorCode}
                                                onBlur={blurHandler}
                                                onChange={changeHandler}
                                                value={formValues?.sectorCode}
                                                mandatory
                                            />
                                        </div>
                                    </div>

                                    <div className="duo_inputBox">
                                        <div className="form-group">
                                            <Input
                                                label="Scheme"
                                                name="schemeName"
                                                placeholder="Enter Scheme Name"
                                                onFocus={focusHandler}
                                                error={errors?.schemeName}
                                                onBlur={blurHandler}
                                                onChange={changeHandler}
                                                value={formValues?.schemeName}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <Input
                                                label="Scheme Code"
                                                name="schemeCode"
                                                placeholder="Enter Scheme Code"
                                                onFocus={focusHandler}
                                                error={errors?.schemeCode}
                                                onBlur={blurHandler}
                                                onChange={changeHandler}
                                                value={formValues?.schemeCode}
                                            />
                                        </div>
                                    </div>

                                    <div className="duo_inputBox">
                                        <div className="form-group">
                                            <Input
                                                label="NOS Name"
                                                name="nos"
                                                placeholder="Enter NOS Name"
                                                onFocus={focusHandler}
                                                error={errors?.nos}
                                                onBlur={blurHandler}
                                                onChange={changeHandler}
                                                value={formValues?.nos}
                                                mandatory
                                            />
                                        </div>
                                        <div className="form-group">
                                            <Input
                                                label="NOS Code"
                                                name="nosCode"
                                                placeholder="Enter NOS Code"
                                                onFocus={focusHandler}
                                                error={errors?.nosCode}
                                                onBlur={blurHandler}
                                                onChange={changeHandler}
                                                value={formValues?.nosCode}
                                                mandatory
                                            />
                                        </div>
                                    </div>

                                    <div className="duo_inputBox">
                                        <div className="form-group">
                                            <Input
                                                label="Theory Marks"
                                                name="theoryMarks"
                                                type={"number"}
                                                placeholder="Enter Theory Marks"
                                                hideExponants={true}
                                                onFocus={focusHandler}
                                                error={errors?.theoryMarks}
                                                onBlur={blurHandler}
                                                onChange={changeHandler}
                                                value={formValues?.theoryMarks}
                                                mandatory
                                            />
                                        </div>
                                        <div className="form-group">
                                            <Input
                                                label="Practical Marks"
                                                name="practicalMarks"
                                                placeholder="Enter Practical Marks"
                                                type={"number"}
                                                hideExponants={true}
                                                onFocus={focusHandler}
                                                error={errors?.practicalMarks}
                                                onBlur={blurHandler}
                                                onChange={changeHandler}
                                                value={formValues?.practicalMarks}
                                                mandatory
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="select_md">
                                            <SelectInput
                                                name="status"
                                                label="Status"
                                                placeHolder="Status"
                                                value={formValues?.status}
                                                handleChange={(e) => {
                                                    changeHandler(e);
                                                }}
                                                options={STATUS}
                                                error={errors?.status}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <section className="buttonsBox">
                <div className="action-btn">
                    <div
                        className="action-btn-card"
                        style={{ justifyContent: "flex-start", marginLeft: "35px" }}
                    >
                        <Button
                            className={`outlined-btn submit-btn`}
                            variant="outlined"
                            onClick={clearFormValues}
                            sx={{
                                width: "90px",
                                height: "42px",
                                textTransform: "unset",
                            }}
                            disabled={loading ? true : false}
                        >
                            Cancel
                        </Button>
                        <Button
                            className={`light-blue-btn submit-btn`}
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{
                                width: "90px",
                                height: "42px",
                                textTransform: "unset",
                                backgroundColor: "#00b2ff !important"
                            }}
                            disabled={loading ? true : false}
                        >
                            {loading ? <PulseLoader size="10px" color="white" /> : "Save"}
                        </Button>
                    </div>
                    <div
                        className="action-btn-card"
                        style={{ justifyContent: "flex-end" }}
                    >
                        <div className="action_btn_lg">
                            <Button
                                className={`light-blue-btn submit-btn`}
                                variant="outlined"
                                onClick={handleSaveAndNext}
                                sx={{
                                    width: "130px",
                                    height: "42px",
                                    textTransform: "unset",
                                    backgroundColor: "#00b2ff !important"
                                }}
                                disabled={loading ? true : false}
                            >
                                Save and Next
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CreateQuestionForm;
