// Dimensões e parâmetros gerais
const C = {
  W: 360,
  H: 600,
  LAKE_Y: 200,
  WALL_W: 20,

  PX_PER_METER: 4,
  DEPTH_MAX_M: 500,

  DESC_SPEED_PX: 2,
  ASC_INIT_PX: 2,
  ASC_ACCEL: 1.001,
  HITS_LIMIT: 3,

  COLORS: {
    lake: [0, 110, 215],
    wall: "brown",
    fisher: "#fff",
    rod: "#000",
    fish: "yellow",
    fishHooked: "#5fd98c",
    flash: [255, 60, 60],
  },
};
export default C;