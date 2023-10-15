const { db } = require("../models/index");

const getRapByCodeService = async (code) => {
  const query = `select r.code, r.name, r.openTime, r.closeTime, r.countryAddress, r.cityAddress, r.districtAddress, r.wardAddress, r.status, r.numberRap, px.fullName as nameWard, qh.fullName as nameDistrict, ttp.fullName as nameCity, qg.fullName as nameCountry from rap as r
    join valuestructure as px on r.wardAddress = px.code
    join valuestructure as qh on r.districtAddress = qh.code
    join valuestructure as ttp on r.cityAddress = ttp.code
    join valuestructure as qg on r.countryAddress = qg.code
    where r.code = '${code}'`;
  const [rap, metadata] = await db.sequelize.query(query);
  return rap[0];
};
const getAllRapService = async () => {
  const query = `select r.code, r.name, r.openTime, r.closeTime, r.countryAddress, r.cityAddress, r.districtAddress, r.wardAddress, r.status, r.numberRap, px.fullName as nameWard, qh.fullName as nameDistrict, ttp.fullName as nameCity, qg.fullName as nameCountry from rap as r
        join valuestructure as px on r.wardAddress = px.code
        join valuestructure as qh on r.districtAddress = qh.code
        join valuestructure as ttp on r.cityAddress = ttp.code
        join valuestructure as qg on r.countryAddress = qg.code`;
  const [allRap, metadata] = await db.sequelize.query(query);
  return allRap;
};

const createRapService = async (rap) => {
  const newRap = await db.Rap.create(rap);
  return newRap;
};

module.exports = {
  getAllRapService,
  createRapService,
  getRapByCodeService,
};
