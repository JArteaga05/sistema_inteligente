"""Sistema de Vehículos Inteligentes en Python.

Este script replica la lógica del proyecto web con programación orientada a
objetos y polimorfismo.
"""


class Vehiculo:
    def __init__(self, marca, modelo):
        self.marca = marca
        self.modelo = modelo
        self.velocidad_actual = 0.0

    def acelerar(self, turbo=False, terreno="normal"):
        incremento = 15.0 if turbo else 10.0
        factores = {"normal": 1.0, "montaña": 0.7, "arena": 0.6, "asfalto": 1.2}
        incremento *= factores.get(terreno, 1.0)
        self.velocidad_actual += incremento
        return f"{self.marca} {self.modelo} acelera +{incremento:.1f} km/h."

    def detener(self):
        self.velocidad_actual = 0.0
        return f"{self.marca} {self.modelo}: vehículo detenido."

    def obtener_informacion(self):
        return f"{self.__class__.__name__} | {self.marca} {self.modelo} | {self.velocidad_actual:.1f} km/h"


class AutoElectrico(Vehiculo):
    def __init__(self, marca, modelo, energia=100.0):
        super().__init__(marca, modelo)
        self.energia = energia

    def acelerar(self, turbo=False, terreno="normal"):
        factores = {"normal": 1.0, "montaña": 0.7, "arena": 0.6, "asfalto": 1.2}
        incremento = (12.0 if turbo else 8.0) * factores.get(terreno, 1.0)
        self.velocidad_actual += incremento
        self.energia = max(0.0, self.energia - max(1.0, incremento * 0.5))
        return (
            f"Auto eléctrico {self.marca}: aceleración progresiva (+{incremento:.1f} km/h). "
            f"Energía: {self.energia:.1f}%."
        )

    def detener(self):
        self.velocidad_actual = 0.0
        return f"Auto eléctrico {self.marca}: frenado regenerativo."


class Moto(Vehiculo):
    def acelerar(self, turbo=False, terreno="normal"):
        factores = {"normal": 1.0, "montaña": 0.7, "arena": 0.5, "asfalto": 1.2}
        incremento = (20.0 if turbo else 15.0) * factores.get(terreno, 1.0)
        self.velocidad_actual += incremento
        return f"Moto {self.marca}: aceleración rápida (+{incremento:.1f} km/h). Estabilidad reducida."

    def detener(self):
        self.velocidad_actual = 0.0
        return f"Moto {self.marca}: frenado rápido; mantener el equilibrio."


class Camion(Vehiculo):
    def acelerar(self, turbo=False, terreno="normal"):
        factores = {"normal": 1.0, "montaña": 0.6, "arena": 0.5, "asfalto": 1.1}
        incremento = (7.0 if turbo else 5.0) * factores.get(terreno, 1.0)
        self.velocidad_actual += incremento
        return (
            f"Camión {self.marca}: aceleración lenta (+{incremento:.1f} km/h), "
            "debido a su mayor peso."
        )

    def detener(self):
        self.velocidad_actual = 0.0
        return f"Camión {self.marca}: frenado gradual por su gran peso."


def run_demo():
    vehiculos = [
        AutoElectrico("Tesla", "Model 3"),
        Moto("Yamaha", "MT-07"),
        Camion("Volvo", "FH"),
    ]

    print("=== SISTEMA DE VEHÍCULOS INTELIGENTES ===")
    print("Prueba de aceleración y polimorfismo")
    print()

    for vehiculo in vehiculos:
        print(vehiculo.obtener_informacion())
        print(vehiculo.acelerar())
        print(vehiculo.detener())
        print()

    print("=== PRUEBA POLIMÓRFICA: mismo ciclo para todos ===")
    for vehiculo in vehiculos:
        print(vehiculo.obtener_informacion())
        print(vehiculo.acelerar(True, "montaña"))
        print(vehiculo.detener())
        print()


if __name__ == "__main__":
    run_demo()
