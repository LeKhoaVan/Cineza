const { db } = require("../models/index");
const { QueryTypes } = require("sequelize");
const user = require("../models/user");

const getAllUserService = async () => {
    const query = `select u.code, u.type, u.fullName, u.numberPhone, u.dateOfBirth, u.password, u.countryAddress, u.cityAddress, u.districtAddress,
    u.wardAddress, u.numberHome, u.status, ct.code as codeCountry, ct.fullName as nameCountry, cit.code as codeCity, cit.fullName as nameCity,
    dt.code as codeDistrict, dt.fullName as nameDistrict, wd.code as codeWard, wd.fullName as nameWard
    from user as u
    join address as ct on u.countryAddress = ct.code
    join address as cit on u.cityAddress = cit.code
    join address as dt on u.districtAddress = dt.code
    join address as wd on u.wardAddress = wd.code;`
    const dataUser = await db.sequelize.query(query, { type: QueryTypes.SELECT });
    return dataUser;
}

const getUserByCodeService = async (codeUser) => {
    const query = `select u.code, u.type, u.fullName, u.numberPhone, u.dateOfBirth, u.password, u.countryAddress, u.cityAddress, u.districtAddress,
    u.wardAddress, u.numberHome, u.status, ct.code as codeCountry, ct.fullName as nameCountry, cit.code as codeCity, cit.fullName as nameCity,
    dt.code as codeDistrict, dt.fullName as nameDistrict, wd.code as codeWard, wd.fullName as nameWard
    from user as u
    join address as ct on u.countryAddress = ct.code
    join address as cit on u.cityAddress = cit.code
    join address as dt on u.districtAddress = dt.code
    join address as wd on u.wardAddress = wd.code
    where u.code = '${codeUser}';`
    const [dataUser, metadata] = await db.sequelize.query(query, { type: QueryTypes.SELECT });
    return dataUser;
}

const getUserByTypeService = async (typeUser) => {
    const query = `select u.code, u.type, u.fullName, u.numberPhone, u.dateOfBirth, u.password, u.countryAddress, u.cityAddress, u.districtAddress,
    u.wardAddress, u.numberHome, u.status, ct.code as codeCountry, ct.fullName as nameCountry, cit.code as codeCity, cit.fullName as nameCity,
    dt.code as codeDistrict, dt.fullName as nameDistrict, wd.code as codeWard, wd.fullName as nameWard
    from user as u
    join address as ct on u.countryAddress = ct.code
    join address as cit on u.cityAddress = cit.code
    join address as dt on u.districtAddress = dt.code
    join address as wd on u.wardAddress = wd.code
    where u.type = '${typeUser}';`
    const dataUser = await db.sequelize.query(query, { type: QueryTypes.SELECT });
    return dataUser;
}

const createNewUserService = async (user) => {
    const newUser = await db.User.create(user);
    return newUser;
}

const updateUserService = async (codeUser, user) => {
    const updateUser = await db.User.update(user, {
        where: {
            code: codeUser
        }
    })
    return updateUser;
};

module.exports = {
    getAllUserService,
    getUserByCodeService,
    getUserByTypeService,
    createNewUserService,
    updateUserService,
}