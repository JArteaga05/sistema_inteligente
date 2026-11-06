import unittest

from main import AutoElectrico, Camion, Moto, Vehiculo


class VehiculoTests(unittest.TestCase):
    def test_vehiculo_base_aceleracion(self):
        auto = Vehiculo("Ford", "Focus")
        mensaje = auto.acelerar()
        self.assertIn("Ford Focus", mensaje)
        self.assertGreater(auto.velocidad_actual, 0)

    def test_clases_hijas_no_comparten_comportamiento(self):
        auto = AutoElectrico("Tesla", "Model 3")
        moto = Moto("Yamaha", "MT-07")
        camion = Camion("Volvo", "FH")

        self.assertIn("Auto eléctrico", auto.acelerar())
        self.assertIn("Moto", moto.acelerar())
        self.assertIn("Camión", camion.acelerar())

    def test_detener_reinicia_velocidad(self):
        moto = Moto("Honda", "CBR")
        moto.acelerar()
        moto.detener()
        self.assertEqual(moto.velocidad_actual, 0)


if __name__ == "__main__":
    unittest.main()
