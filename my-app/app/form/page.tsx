/* eslint-disable @next/next/no-img-element */
"use client";

import {useState} from "react";
import {useForm, SubmitHandler, Controller} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Toaster, toast} from "sonner";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UpLoadWidget from "@/components/UpLoadWiget";
import SendCarData from "@/utils/sendCarData";
import {carSchema} from "@/validations/addCarSchema";

type Inputs = z.infer<typeof carSchema>;

export default function ImprovedCarForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(carSchema),
  });

  const [imageUrl, setImageUrl] = useState<string>("");
  const [isUploadDisabled, setIsUploadDisabled] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!imageUrl) {
      toast.warning("Por favor, sube una imagen");
      return;
    }

    try {
      const updatedData = {...data, mediaUrl: imageUrl};
      const fetchData = await SendCarData(updatedData);

      if (fetchData) {
        toast.success("Datos del vehículo enviados con éxito");
        reset();
        setImageUrl("");
        setIsUploadDisabled(false);
      } else {
        toast.error("Error al enviar los datos del vehículo");
      }
    } catch (error) {
      console.error("Error al enviar datos:", error);
      toast.error("Ocurrió un error al enviar los datos");
    }
  };

  const handleCancelImg = () => {
    setImageUrl("");
    setIsUploadDisabled(false);
  };

  return (
    <div className="container mx-auto py-10">
      <Toaster richColors />
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Agregar Nuevo Vehículo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Información Básica</h2>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brand">Marca</Label>
                  <Input
                    id="brand"
                    placeholder="Ej. Toyota"
                    {...register("brand")}
                  />
                  {errors.brand && (
                    <p className="text-sm text-red-500">
                      {errors.brand.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">Modelo</Label>
                  <Input
                    id="model"
                    placeholder="Ej. Corolla"
                    {...register("model")}
                  />
                  {errors.model && (
                    <p className="text-sm text-red-500">
                      {errors.model.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Año</Label>
                  <Input
                    type="number"
                    id="year"
                    placeholder="Ej. 2020"
                    {...register("year")}
                  />
                  {errors.year && (
                    <p className="text-sm text-red-500">
                      {errors.year.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vin">VIN</Label>
                  <Input
                    id="vin"
                    placeholder="Ingrese VIN"
                    {...register("vin")}
                  />
                  {errors.vin && (
                    <p className="text-sm text-red-500">{errors.vin.message}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    placeholder="Ej. Rojo"
                    {...register("color")}
                  />
                  {errors.color && (
                    <p className="text-sm text-red-500">
                      {errors.color.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mileage">Kilometraje</Label>
                  <Input
                    type="number"
                    id="mileage"
                    placeholder="Ej. 50000"
                    {...register("mileage")}
                  />
                  {errors.mileage && (
                    <p className="text-sm text-red-500">
                      {errors.mileage.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <div className="space-y-2">
                  <Label htmlFor="mileage">Precio de alquiler por dia</Label>
                  <Input
                    type="number"
                    placeholder="Ej. $ 100.000"
                    {...register("price")}
                  />
                  {errors.price && (
                    <p className="text-sm text-red-500">
                      {errors.price.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Detalles Técnicos</h2>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fuelType">Tipo de Combustible</Label>
                  <Controller
                    name="fuelType"
                    control={control}
                    render={({field}) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione tipo de combustible" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="electric">Eléctrico</SelectItem>
                          <SelectItem value="diesel">Diésel</SelectItem>
                          <SelectItem value="gas">Gas</SelectItem>
                          <SelectItem value="gasoline">Gasolina</SelectItem>
                          <SelectItem value="hybrid">Híbrido</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.fuelType && (
                    <p className="text-sm text-red-500">
                      {errors.fuelType.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="transmissionType">Transmisión</Label>
                  <Controller
                    name="transmissionType"
                    control={control}
                    render={({field}) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione tipo de transmisión" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="automatic">Automática</SelectItem>
                          <SelectItem value="manual">Manual</SelectItem>
                          <SelectItem value="cvt">CVT</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.transmissionType && (
                    <p className="text-sm text-red-500">
                      {errors.transmissionType.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="numberOfDoors">Número de Puertas</Label>
                  <Input
                    type="number"
                    id="numberOfDoors"
                    placeholder="Ej. 2, 4"
                    {...register("numberOfDoors")}
                  />
                  {errors.numberOfDoors && (
                    <p className="text-sm text-red-500">
                      {errors.numberOfDoors.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driveType">Tipo de Tracción</Label>
                  <Controller
                    name="driveType"
                    control={control}
                    render={({field}) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione tipo de tracción" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="awd">AWD</SelectItem>
                          <SelectItem value="fwd">FWD</SelectItem>
                          <SelectItem value="rwd">RWD</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.driveType && (
                    <p className="text-sm text-red-500">
                      {errors.driveType.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bodyType">Tipo de Carrocería</Label>
                  <Controller
                    name="bodyType"
                    control={control}
                    render={({field}) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione tipo de carrocería" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sedan">Sedán</SelectItem>
                          <SelectItem value="suv">SUV</SelectItem>
                          <SelectItem value="hatchback">Hatchback</SelectItem>
                          <SelectItem value="coupe">Coupé</SelectItem>
                          <SelectItem value="truck">Camioneta</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.bodyType && (
                    <p className="text-sm text-red-500">
                      {errors.bodyType.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="horsePower">Caballos de Fuerza</Label>
                  <Input
                    type="number"
                    id="horsePower"
                    placeholder="Ej. 150"
                    {...register("horsePower")}
                  />
                  {errors.horsePower && (
                    <p className="text-sm text-red-500">
                      {errors.horsePower.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="torque">Torque (Nm)</Label>
                <Input
                  type="number"
                  id="torque"
                  placeholder="Ej. 250"
                  {...register("torque")}
                />
                {errors.torque && (
                  <p className="text-sm text-red-500">
                    {errors.torque.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Imagen del Vehículo</h2>
              <Separator />
              <div className="flex flex-col items-center gap-4">
                <UpLoadWidget
                  onUploadComplete={(url: string) => {
                    setImageUrl(url);
                    setIsUploadDisabled(true);
                  }}
                  isDisabledProp={isUploadDisabled}
                />
                {imageUrl && (
                  <div className="relative">
                    <img
                      src={imageUrl}
                      alt="Vehículo"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2"
                      onClick={handleCancelImg}
                    >
                      X
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => reset()}>
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
          >
            {isSubmitting ? "Enviando..." : "Enviar"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
