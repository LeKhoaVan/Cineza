const { where, Model, Sequelize } = require("sequelize");
const { db } = require("../models/index.js");

const getValueStructureByCodeService = async (code) => {
    const valueStructure = await db.ValueStructure.findOne({
        where: {
            code: code
        }
    })
    return valueStructure;
}
const getValueStructureByTypeService = async (type) => {
    const valueStructure = await db.ValueStructure.findAll({
        where: {
            type: type
        }
    });
    return valueStructure;
}
const getValueStructureByLevelService = async (level) => {
    const query = ``
    const valueStructure = await db.ValueStructure.findAll({
        where: {
            level: level
        }
    });
    return valueStructure;
}
// service address
const getAddressByCodeService = async (code) => {
    const query = `select vs.id, vs.code, vs.fullName, vs.level, vs.type, vs.parentId, vs.status, pavs.fullName as fullNameParent, hc.value
            from ValueStructure as vs 
            join ValueStructure as pavs on vs.parentId = pavs.id 
            join HierachyStructure as hc on hc.id = vs.type
            where vs.code = "${code}"`;
    const [address, metadata] = await db.sequelize.query(query);
    return address[0]
}
const getValueAddressByLevelService = async (level) => {
    const query = `select vs.id, vs.code, vs.fullName, vs.level, vs.type, vs.parentId, vs.status, pavs.fullName as fullNameParent, hc.value 
        from ValueStructure as vs 
        join ValueStructure as pavs on vs.parentId = pavs.id
        join HierachyStructure as hc on hc.id = vs.type
    where vs.level = "`+ level + '"';
    const [valueStructure, metadata] = await db.sequelize.query(query);
    return valueStructure;
}

const getValueAddressByLevelQuocGiaService = async (level) => {
    const query = `select vs.id, vs.code, vs.fullName, vs.level, vs.type, vs.parentId, vs.status, hc.value 
        from ValueStructure as vs 
        join HierachyStructure as hc on hc.id = vs.type
        where vs.level = "`+ level + '"';
    const [valueStructure, metadata] = await db.sequelize.query(query);
    return valueStructure;
}


const createAddressStructerService = async (address) => {
    const newAddress = await db.ValueStructure.create(address);
    return newAddress;
}

const updateAddressService = async (code, address) => {
    const updateAddress = await db.ValueStructure.update(address, {
        where: {
            code: code
        }
    })
    return updateAddress;
}

const getAllAddressService = async () => {
    const query = `select vs.id, vs.code, vs.type, vs.level, vs.parentId, vs.fullName, vs.status, pavs.fullName as parentName from ValueStructure as vs 
            left join ValueStructure as pavs on vs.parentId = pavs.id 
            where vs.type = "6ca0cb42-42c3-4df2-a7a3-31045df8387e";`
    const [addressList, metadata] = await db.sequelize.query(query);
    return addressList;
}

//service user
const getValueUserByCodeService = async (code) => {
    // const query = `select us.id, us.code, us.fullName, us.level, us.type, us.addressId, us.numberPhone, us.password, us.dateOfBirth, ad.fullName as addressName, us.status
    //     from ValueStructure as us left join ValueStructure as ad on us.addressId = ad.id
    //     where us.code = '` + code + "'";
    const query =
        `select us.id, us.code, us.fullName, us.level, us.type, us.numberPhone, us.password, us.dateOfBirth, us.status, 
            cnt.fullName as countryName, cnt.id as countryId, 
            ct.fullName as cityName, ct.id as cityId,
            dt.fullName as districtName, dt.id as districtId,
            wd.fullName as wardName, wd.id as wardId,
            us.numberHome 
        from ValueStructure as us join ValueStructure as cnt on us.countryAddress = cnt.id 
        join ValueStructure as ct on ct.id = us.cityAddress 
        join ValueStructure as dt on us.districtAddress = dt.id 
        join ValueStructure as wd on us.wardAddress = wd.id
        where us.code = '` + code + "'";
    const [user, metadata] = await db.sequelize.query(query);
    return user[0];
}
const getAllUserService = async () => {
    // const query = `select us.id, us.code, us.fullName, us.level, us.type, us.addressId, us.numberPhone, us.password, us.dateOfBirth, us.status
    //     from ValueStructure as us where us.type = "5670d9d6-1e2c-4a26-99fc-e322b4f80e3a"`;
    const query =
        `select us.id, us.code, us.fullName, us.level, us.type, us.numberPhone, us.password, us.dateOfBirth, us.status,
        cnt.fullName as countryName, 
        ct.fullName as cityName, 
        dt.fullName as districtName, 
        wd.fullName as wardName, 
        us.numberHome
        from ValueStructure as us join ValueStructure as cnt on us.countryAddress = cnt.id 
        join ValueStructure as ct on ct.id = us.cityAddress 
        join ValueStructure as dt on us.districtAddress = dt.id 
        join ValueStructure as wd on us.wardAddress = wd.id
        where us.type = "6cadf9a4-4410-4bf3-a99b-e5f020757553"`;
    const [listUser, metadata] = await db.sequelize.query(query);
    return listUser;
}
const createUserStructureService = async (user) => {
    const newUser = await db.ValueStructure.create(user);
    return newUser;
}

const updateUserStructuerService = async (code, user) => {
    const updateUser = await db.ValueStructure.update(user, {
        where: {
            code: code
        }
    });
    return updateUser;
}

//service ticket
const createTicketStructService = async (ticket) => {
    const newTicket = await db.ValueStructure.create(ticket);
    return newTicket;
}

const updateTicketStructerService = async (code, ticket) => {
    const updateTicket = await db.ValueStructure.update(ticket, {
        where: {
            code: code
        }
    });
    return updateTicket;
}

// const testLoadData = async () => {
//     const query = "select * from ValueStructure as vs join HierachyStructure as hs on vs.type = hs.id where vs.code = 'user07' ";
//     const [result, meta] = await db.sequelize.query(query);
//     return result
// }
// const testLoadData2 = async () => {
//     const ticket = await db.ValueStructure.findOne({
//         where: {
//             code: "user07"
//         },

//         include: [
//             {
//                 model: db.ValueStructure,
//             },
//             {
//                 model: db.HierachyStructure,
//             }
//         ]
//     });

//     console.log(ticket);
//     return ticket;
// }
module.exports = {
    getValueStructureByCodeService,
    getValueStructureByTypeService,
    getValueStructureByLevelService,
    getAddressByCodeService,
    createAddressStructerService,
    getValueAddressByLevelQuocGiaService,
    getValueAddressByLevelService,
    updateAddressService,
    getAllAddressService,
    getValueUserByCodeService,
    createUserStructureService,
    updateUserStructuerService,
    getAllUserService,
    createTicketStructService,
    updateTicketStructerService,
}