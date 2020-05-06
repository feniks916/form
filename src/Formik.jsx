/* eslint-disable arrow-parens */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Input, Button, Checkbox } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Formik, FieldArray, Field } from 'formik';
import * as Yup from 'yup';
import classes from './App.module.scss';
import postData from './API';

const FormComponent = () => {
  const [reqData, setreqData] = useState('');
  return (
    <div className={classes.wrapper}>
      <Formik
        initialValues={{
          email: '',
          name: '',
          age: '',
          password: '',
          repeatPassword: '',
          acceptTerms: false,
          skills: [{ id: 0, value: '' }],
        }}
        onSubmit={async values => {
          await new Promise(resolve => setTimeout(resolve, 500));
          postData({
            email: values.email,
            name: values.name,
            age: values.age,
            password: values.password,
            repeatPassword: values.repeatPassword,
            acceptTerms: values.acceptTerms,
            skills: values.skills.filter(el => el.value !== ''),
          }).then(response => setreqData(response.data));
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email()
            .required('Поле обязательно'),
          name: Yup.string().required('Поле обязательно'),
          age: Yup.number().required('Поле обязательно'),
          password: Yup.string()
            .required('Поле обязательно')
            .min(8, 'Password is too short - should be 8 chars minimum.')
            .max(40, 'Password is too long - should be 40 chars maximum.')
            .matches(
              /(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])/,
              'Исплользуй 1 цифру 1 заглавную и одну строчную букву',
            ),
          repeatPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Пароли не совпадают'),
          acceptTerms: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required'),
        })}
      >
        {props => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
            setFieldValue,
          } = props;
          return (
            <form onSubmit={handleSubmit} className={classes.form}>
              {reqData === 'status 200' ? (
                <h3 className={classes.done}>вы успешно зарегистрированы</h3>
              ) : (
                <h3>Registration Form</h3>
              )}
              <span className={classes.span}>name</span>
              <Input
                id="name"
                placeholder="Enter your name"
                type="text"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.name && touched.name && <div className={classes.feedback}>{errors.name}</div>}
              <span className={classes.span}>email</span>
              <Input
                id="email"
                placeholder="Enter your email"
                type="text"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {reqData === 'error 500' && <h5>email already exists</h5>}
              {errors.email && touched.email && (
                <div className={classes.feedback}>{errors.email}</div>
              )}
              <span className={classes.span}>age</span>
              <Input
                id="age"
                placeholder="Enter your age"
                type="number"
                value={values.age}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.age && touched.age && <div className={classes.feedback}>{errors.age}</div>}
              <span className={classes.span}>Password</span>
              <Input
                id="password"
                placeholder="Enter password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password && (
                <div className={classes.feedback}>{errors.password}</div>
              )}
              <span className={classes.span}>repeat Password</span>
              <Input
                id="repeatPassword"
                placeholder="repeat Password"
                type="password"
                value={values.repeatPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.repeatPassword && touched.repeatPassword && (
                <div className={classes.feedback}>{errors.repeatPassword}</div>
              )}
              <FieldArray name="skills">
                {({ push, remove }) => (
                  <div>
                    {values.skills.map((el, index) => (
                      <div key={el.id} className={classes.skillbox}>
                        <span className={classes.span}>Skill</span>
                        <div className={classes.fieldArea}>
                          <Field name={`skills[${index}].value`} placeholder="Enter your skill" />
                          {values.skills.length > 1 && (
                            <CloseCircleOutlined
                              onClick={() => remove(index)}
                              className={classes.skills}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                    <Button
                      type="button"
                      onClick={() => push({ id: Number(values.skills.length), value: '' })}
                    >
                      add to list
                    </Button>
                  </div>
                )}
              </FieldArray>
              <div className={classes.checkBox}>
                <div>
                  <Checkbox
                    type="checkbox"
                    id="acceptTerms"
                    onChange={event => setFieldValue('acceptTerms', !values.acceptTerms)}
                    checked={values.acceptTerms}
                  />
                  {errors.acceptTerms && touched.acceptTerms && (
                    <div className={classes.feedback}>{errors.acceptTerms}</div>
                  )}
                </div>
                <span className={classes.span}>Согласен с условиями</span>
              </div>
              <div className={classes.buttonsArea}>
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
                <Button type="reset" onClick={handleReset}>
                  Reset
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default FormComponent;
